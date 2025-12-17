import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gate2Assumptions } from './entities/gate2-assumptions.entity';
import { CreateGate2AssumptionsDto } from './dto/create-gate2-assumptions.dto';
import { UpdateGate2AssumptionsDto } from './dto/update-gate2-assumptions.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class Gate2AssumptionsService {
  constructor(
    @InjectRepository(Gate2Assumptions)
    private readonly repo: Repository<Gate2Assumptions>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateGate2AssumptionsDto): Promise<Gate2Assumptions> {
    const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
    const entity = this.repo.create({ ...dto, project });
    return this.repo.save(entity);
  }

  async findAll(): Promise<Gate2Assumptions[]> {
    return this.repo.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<Gate2Assumptions> {
    return this.repo.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateGate2AssumptionsDto): Promise<Gate2Assumptions> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
