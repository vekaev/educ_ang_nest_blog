import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from '../../admin/models/admin.entity';
import { UserDto } from '../../admin/dto/user.dto';
import { LoginUserDto } from '../dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private adminService: Repository<Admin>;
  constructor(private jwtService: JwtService, private connection: Connection) {
    this.adminService = this.connection.getRepository(Admin);
  }

  async findById(id) {
    const user = await this.adminService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Can't find user with ${id} id`);
    }

    return user;
  }

  async validateAdmin({
    login,
    password,
  }: LoginUserDto): Promise<Partial<Admin>> {
    const admin = await this.adminService.findOne({ where: { login } });

    if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
      return new UserDto(admin);
    }

    return null;
  }

  async login(admin: Admin) {
    const payload = { id: admin.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
