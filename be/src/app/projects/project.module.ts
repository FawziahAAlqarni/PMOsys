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
import { Gate2ScopeService } from './gate2-scope.service';
import { Gate2ScopeController } from './gate2-scope.controller';
import { Gate2ProcurementService } from './gate2-procurement.service';
import { Gate2ProcurementController } from './gate2-procurement.controller';
import { Gate2AssumptionsService } from './gate2-assumptions.service';
import { Gate2AssumptionsController } from './gate2-assumptions.controller';
import { Gate2ChangeCardService } from './gate2-change-card.service';
import { Gate2ChangeCardController } from './gate2-change-card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Project, Gate1, Gate2, Gate3, Gate4,
    RiskRegister, Gate2Scope, Gate2Procurement, Gate2Assumptions, Gate2ChangeCard
  ])],
  controllers: [
    ProjectController, RiskRegisterController,
    Gate2ScopeController, Gate2ProcurementController, Gate2AssumptionsController, Gate2ChangeCardController
  ],
  providers: [
    ProjectService, RiskRegisterService,
    Gate2ScopeService, Gate2ProcurementService, Gate2AssumptionsService, Gate2ChangeCardService
  ],
})
export class ProjectModule {
}
