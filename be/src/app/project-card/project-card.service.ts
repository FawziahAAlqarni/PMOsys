import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProjectCard} from './entities/project-card.entity';
import {CreateProjectCardDto} from './dto/create-project-card.dto';

@Injectable()
export class ProjectCardService {
  constructor(
    @InjectRepository(ProjectCard)
    private readonly projectCardRepository: Repository<ProjectCard>,
  ) {
  }

  async create(dto: CreateProjectCardDto): Promise<ProjectCard> {

    const task = this.projectCardRepository.create({
      ...dto,
    });

    return this.projectCardRepository.save(task);
  }

  async findAll(): Promise<ProjectCard[]> {
    return this.projectCardRepository.find({
      order: {createdAt: 'ASC'},
    });
  }

  async findOne(id: string): Promise<ProjectCard | null> {
    return this.projectCardRepository.findOne({where: {id}});
  }

  // TODO: Implement when portfolio field is added to ProjectCard
  // async findByPortfolio(portfolio: Portfolio): Promise<ProjectCard[]> {
  //   return this.projectCardRepository.find({
  //     where: {portfolioName: portfolio},
  //     order: {createdAt: 'ASC'},
  //   });
  // }

  async remove(id: string): Promise<void> {
    await this.projectCardRepository.softDelete(id);
  }

}
