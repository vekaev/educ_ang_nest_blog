import { Injectable } from '@nestjs/common';
import { Admin } from '../models/admin.entity';

@Injectable()
export class AdminService {
  admins: [Admin];

  async findByLogin(login: string): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.login === login);
  }

  async find(id: string): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.id == +id);
  }
}
