import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    // Check if email already exists
    const existing = await this.permissionsRepository.findOne({
      where: { email: createPermissionDto.email }
    });

    if (existing) {
      throw new ConflictException('هذا الإيميل مسجل مسبقاً في النظام');
    }

    const permission = this.permissionsRepository.create(createPermissionDto);
    return await this.permissionsRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionsRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException('الصلاحية غير موجودة');
    }
    return permission;
  }

  async findByEmail(email: string): Promise<Permission> {
    return await this.permissionsRepository.findOne({ where: { email } });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);

    // Check if email is being changed and if it already exists
    if (updatePermissionDto['email'] && updatePermissionDto['email'] !== permission.email) {
      const existing = await this.permissionsRepository.findOne({
        where: { email: updatePermissionDto['email'] }
      });
      if (existing) {
        throw new ConflictException('هذا الإيميل مسجل مسبقاً في النظام');
      }
    }

    Object.assign(permission, updatePermissionDto);
    return await this.permissionsRepository.save(permission);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionsRepository.remove(permission);
  }

  async toggleActive(id: number): Promise<Permission> {
    const permission = await this.findOne(id);
    permission.isActive = !permission.isActive;
    return await this.permissionsRepository.save(permission);
  }
}
