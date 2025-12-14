import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  // 1. دالة الإنشاء (تتعامل مع عنصر واحد)
  // النوع هنا: Promise<Project> بدون أقواس []
  async create(data: Partial<Project>): Promise<Project> {
    const newProject = this.projectsRepository.create(data);
    return await this.projectsRepository.save(newProject);
  }

  // 2. دالة جلب الكل (تتعامل مع قائمة)
  // النوع هنا: Promise<Project[]> مع أقواس []
  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }
}