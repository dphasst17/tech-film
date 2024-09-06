import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Responses } from 'src/interfaces/request.interface';
import { User } from 'src/schemas/user.schema';
import { AuthRepository } from './auth.repository';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel('auth') private readonly authService: Model<Auth>,
        @InjectModel('user') private readonly userService: Model<User>,
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository
    ) { }
    private generateToken = (id: string, type: "access" | "refresh") => {
        const token = this.jwtService.sign({ idUser: id }, { expiresIn: type === "access" ? "15m" : "5d" })
        const expired = this.jwtService.decode(token).exp
        return {
            [`${type}`]: token, [`expired_${type}`]: expired
        }

    }
    private encodePass = (password: string) => {
        const saltRound = process.env.SALT as string
        const salt = bcrypt.genSaltSync(Number(saltRound));
        return bcrypt.hashSync(password, salt);
    }
    private decodePass = (password: string, hash: string) => {
        return bcrypt.compareSync(password, hash)
    }
    async login(username: string, password: string): Promise<Responses> {
        const getData = await this.authRepository.login(username)
        if (!getData || getData.length === 0) { return { status: 403, message: 'Username does not exist' } }
        const isPassword = this.decodePass(password, getData[0].password)
        if (!isPassword) { return { status: 403, message: 'Incorrect password' } }
        const token = this.generateToken(getData[0].idUser, "access")
        const refreshToken = this.generateToken(getData[0].idUser, "refresh")
        return { status: 200, data: { ...token, ...refreshToken, role: getData[0].role } }

    }
    async register(data: { [key: string]: string | number }): Promise<Responses> {
        const dataAuth = {
            idUser: data.username,
            username: data.username,
            password: this.encodePass(data.password as string),
            role: data.role ? data.role : 2
        }
        const dataUser = {
            idUser: data.username,
            email: data.email,
            name: data.name,
            phone: data.phone,
            point: 0,
            action: 'active',
            created_at: new Date().toISOString().split("T")[0]
        }
        const isUsername = await this.authRepository.login(data.username as string)
        const isEmail = await this.userService.find({ email: data.email }).exec()
        if (isUsername.length !== 0) { return { status: 403, message: 'Username already exists' } }
        if (isEmail.length !== 0) { return { status: 403, message: 'Email already exists' } }
        data.password = this.encodePass(data.password as string)
        const createdAuth = await this.authRepository.register(dataAuth)
        const createdUser = createdAuth && await this.userService.create(dataUser)
        if (!createdAuth) {
            return { status: 404, message: 'Register failed' }
        }
        if (!createdUser) {
            await this.authRepository.changeAccountAuth(createdAuth.idUser)
            return { status: 404, message: 'Register failed' }
        }
        return { status: 201, message: 'Register success' }
    }
    async updateAuth(idUser: string, data: { current: string, password: string }) {
        const getData = await this.authRepository.login(idUser)
        const isPassword = this.decodePass(data.current, getData[0].password)
        if (!isPassword) { return { status: 403, message: 'Incorrect password' } }
        const updated = await this.authService.findOneAndUpdate({ idUser: idUser }, { password: this.encodePass(data.password) })
        return updated ? { status: 200, message: 'Update auth success' } : { status: 404, message: 'Auth not found' }
    }
    async getNewToken(idUser: string): Promise<Responses> {
        const token = this.generateToken(idUser, "access")
        return token ? { status: 200, data: token } : { status: 404, message: 'User not found' }
    }

}

