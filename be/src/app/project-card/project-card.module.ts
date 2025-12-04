import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectCard} from './entities/project-card.entity';
import {ProjectCardService} from './project-card.service';
import {ProjectCardController} from './project-card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCard])],
  controllers: [ProjectCardController],
  providers: [ProjectCardService],
})
export class ProjectCardModule {
}
