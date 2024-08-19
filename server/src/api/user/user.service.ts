import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Responses } from 'src/interfaces/request.interface';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findAll(): Promise<Responses> {
        const data = await this.userRepository.findAll()
        if (!data) {
            return { status: 404, message: 'User not found' }
        }
        return { status: 200, data: data }
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
