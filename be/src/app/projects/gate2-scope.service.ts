import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gate2Scope } from './entities/gate2-scope.entity';
import { CreateGate2ScopeDto } from './dto/create-gate2-scope.dto';
import { UpdateGate2ScopeDto } from './dto/update-gate2-scope.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class Gate2ScopeService {
  constructor(
    @InjectRepository(Gate2Scope)
    private readonly repo: Repository<Gate2Scope>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateGate2ScopeDto): Promise<Gate2Scope> {
    const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
    const entity = this.repo.create({ ...dto, project });
    return this.repo.save(entity);
  }

  async findAll(): Promise<Gate2Scope[]> {
    return this.repo.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<Gate2Scope> {
    return this.repo.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateGate2ScopeDto): Promise<Gate2Scope> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
