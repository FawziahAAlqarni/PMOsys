import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PinoLogger, InjectPinoLogger} from 'nestjs-pino';
import {ProjectCard} from './entities/project-card.entity';
import {CreateProjectCardDto} from './dto/create-project-card.dto';

@Injectable()
export class ProjectCardService {
  constructor(
    @InjectRepository(ProjectCard)
    private readonly projectCardRepository: Repository<ProjectCard>,
    @InjectPinoLogger(ProjectCardService.name)
    private readonly logger: PinoLogger,
  ) {
  }

  async create(dto: CreateProjectCardDto): Promise<ProjectCard> {
    const projectCard = this.projectCardRepository.create({
      ...dto,
    });

    const savedProjectCard = await this.projectCardRepository.save(projectCard);

    this.logger.info({
      projectCardId: savedProjectCard.id,
      projectCardName: savedProjectCard.name,
    }, 'Project card created');

    return savedProjectCard;
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
