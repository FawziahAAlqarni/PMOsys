import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from './entities/project.entity';
import {Gate1} from './entities/gate1.entity';
import {Gate2} from './entities/gate2.entity';
import {Gate3} from './entities/gate3.entity';
import {Gate4} from './entities/gate4.entity';
import {RiskRegister} from './entities/risk-register.entity';
import { RiskRegisterService } from './risk-register.service';
import { RiskRegisterController } from './risk-register.controller';
import {Gate2Scope} from './entities/gate2-scope.entity';
import {Gate2Procurement} from './entities/gate2-procurement.entity';
import {Gate2Assumptions} from './entities/gate2-assumptions.entity';
import {Gate2ChangeCard} from './entities/gate2-change-card.entity';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Project, Gate1, Gate2, Gate3, Gate4,
    RiskRegister, Gate2Scope, Gate2Procurement, Gate2Assumptions, Gate2ChangeCard
  ])],
  controllers: [ProjectController, RiskRegisterController],
  providers: [ProjectService, RiskRegisterService],
})
export class ProjectModule {
}
