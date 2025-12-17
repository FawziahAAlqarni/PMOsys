import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gate2ChangeCard } from './entities/gate2-change-card.entity';
import { CreateGate2ChangeCardDto } from './dto/create-gate2-change-card.dto';
import { UpdateGate2ChangeCardDto } from './dto/update-gate2-change-card.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class Gate2ChangeCardService {
  constructor(
    @InjectRepository(Gate2ChangeCard)
    private readonly repo: Repository<Gate2ChangeCard>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateGate2ChangeCardDto): Promise<Gate2ChangeCard> {
    const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
    const entity = this.repo.create({ ...dto, project });
    return this.repo.save(entity);
  }

  async findAll(): Promise<Gate2ChangeCard[]> {
    return this.repo.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<Gate2ChangeCard> {
    return this.repo.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateGate2ChangeCardDto): Promise<Gate2ChangeCard> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
