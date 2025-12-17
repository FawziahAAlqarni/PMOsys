import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from './entities/project.entity';
import {Gate1} from './entities/gate1.entity';
import {Gate2} from './entities/gate2.entity';
import {Gate3} from './entities/gate3.entity';
import {Gate4} from './entities/gate4.entity';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Gate1, Gate2, Gate3, Gate4])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {
}
