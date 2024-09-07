import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { Responses } from 'src/interfaces/request.interface';
import { handleFindData } from 'src/utils/service';
import { StaffAuthCreate, StaffInfoCreate } from 'src/interfaces/staff.interface';
@Injectable()
export class StaffService {
    constructor(
        private readonly staffRepository: StaffRepository
    ) { }

    async getStaff(): Promise<Responses> {
        return handleFindData(this.staffRepository.getStaff())
    }

    async getDetailStaff(id: string): Promise<Responses> {
        return handleFindData(this.staffRepository.getStaffById(id))
    }

    async create(dataAuth: StaffAuthCreate[], dataStaff: StaffInfoCreate[]): Promise<Responses> {
        return handleFindData(this.staffRepository.create(dataAuth, dataStaff), 201)
    }
    async getAll(page: string, limit: string): Promise<Responses> {
        const countData = await this.staffRepository.countData()
        const data = await this.staffRepository.findAll(page, limit)
        if (!data) {
            return { status: 404, message: 'Staff not found' }
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
}