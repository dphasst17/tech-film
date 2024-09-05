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
}