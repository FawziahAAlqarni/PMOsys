import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PinoLogger, InjectPinoLogger} from 'nestjs-pino';
import {Project} from './entities/project.entity';
import {CreateProjectDto} from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectPinoLogger(ProjectService.name)
    private readonly logger: PinoLogger,
  ) {
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const projectCard = this.projectRepository.create({
      ...dto,
    });

    const savedProjectCard = await this.projectRepository.save(projectCard);

    this.logger.info({
      projectCardId: savedProjectCard.id,
      projectCardName: savedProjectCard.name,
    }, 'Project created');

    return savedProjectCard;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      order: {createdAt: 'ASC'},
    });
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({where: {id}});
  }

  async remove(id: string): Promise<void> {
    await this.projectRepository.softDelete(id);
  }

}
