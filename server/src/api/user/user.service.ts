import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Responses } from 'src/interfaces/request.interface';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findAll(page: string, limit: string): Promise<Responses> {
        const countData = await this.userRepository.countData()
        const data = await this.userRepository.findAll(page, limit)
        if (!data) {
            return { status: 404, message: 'User not found' }
        }
        return {
            status: 200, data: {
                total: countData,
                totalPage: Math.ceil(data.length / parseInt(limit)),
                limit: parseInt(limit),
                page: parseInt(page),
                detail: data
            }
        }
    }

    async findOne(id: string): Promise<Responses> {
        const data = await this.userRepository.findOne(id)
        if (!data) return { status: 404, message: 'User not found' }
        return { status: 200, data: data }
    }

    async create(data: any): Promise<Responses> {
        const dataCreate = await this.userRepository.create(data)
        if (!dataCreate) return { status: 404, message: 'Create user failed' }
        return { status: 200, data: dataCreate }
    }

    async update(id: string, data: { [key: string]: string | number | boolean | any }): Promise<Responses> {
        if (data.email) {
            const isEmail = await this.userRepository.finData('email', data.email)
            if (isEmail.length !== 0) return { status: 403, message: 'Email already exists' }
        }
        if (data.phone) {
            const isPhone = await this.userRepository.finData('phone', data.phone)
            if (isPhone.length !== 0) return { status: 403, message: 'Phone already exists' }
        }
        const dataUpdate = await this.userRepository.update(id, data)
        if (!dataUpdate) return { status: 404, message: 'Update user failed' }
        return { status: 200, message: 'Update user success' }
    }

    async delete(id: string): Promise<Responses> {
        const dataDelete = await this.userRepository.delete(id)
        if (!dataDelete) return { status: 404, message: 'Delete user failed' }
        return { status: 200, message: 'Delete user success' }
    }

}
