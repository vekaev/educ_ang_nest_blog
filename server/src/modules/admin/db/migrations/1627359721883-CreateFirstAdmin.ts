import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { Admin } from '../../models/admin.entity';
import * as bcrypt from 'bcrypt';

export class CreateFirstAdmin1627359721883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminService: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);

    if (await adminService.findOne({ where: { login: 'admin' } })) {
      return;
    }

    const admin: Admin = adminService.create({
      login: 'admin',
      passwordHash: await bcrypt.hash('secret', 10),
      nickname: 'ADMIN',
    });

    await adminService.insert(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminService: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);
    const admin: Admin = await adminService.findOne({
      where: { login: 'admin' },
    });

    if (!admin) {
      return;
    }

    await adminService.remove(admin);
  }
}
