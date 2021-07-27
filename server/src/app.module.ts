import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
