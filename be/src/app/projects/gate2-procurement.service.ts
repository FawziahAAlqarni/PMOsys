import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gate2Procurement } from './entities/gate2-procurement.entity';
import { CreateGate2ProcurementDto } from './dto/create-gate2-procurement.dto';
import { UpdateGate2ProcurementDto } from './dto/update-gate2-procurement.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class Gate2ProcurementService {
  constructor(
    @InjectRepository(Gate2Procurement)
    private readonly repo: Repository<Gate2Procurement>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateGate2ProcurementDto): Promise<Gate2Procurement> {
    const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
    const entity = this.repo.create({ ...dto, project });
    return this.repo.save(entity);
  }

  async findAll(): Promise<Gate2Procurement[]> {
    return this.repo.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<Gate2Procurement> {
    return this.repo.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateGate2ProcurementDto): Promise<Gate2Procurement> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
