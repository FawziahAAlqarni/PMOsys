import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskRegister } from './entities/risk-register.entity';
import { CreateRiskRegisterDto } from './dto/create-risk-register.dto';
import { UpdateRiskRegisterDto } from './dto/update-risk-register.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class RiskRegisterService {
  constructor(
    @InjectRepository(RiskRegister)
    private readonly riskRegisterRepository: Repository<RiskRegister>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(dto: CreateRiskRegisterDto): Promise<RiskRegister> {
    const project = await this.projectRepository.findOne({ where: { id: dto.projectId } });
    const risk = this.riskRegisterRepository.create({ ...dto, project });
    return this.riskRegisterRepository.save(risk);
  }

  async findAll(): Promise<RiskRegister[]> {
    return this.riskRegisterRepository.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<RiskRegister> {
    return this.riskRegisterRepository.findOne({ where: { id }, relations: ['project'] });
  }

  async update(id: string, dto: UpdateRiskRegisterDto): Promise<RiskRegister> {
    await this.riskRegisterRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.riskRegisterRepository.softDelete(id);
  }
}
