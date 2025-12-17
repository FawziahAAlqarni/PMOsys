import { PartialType } from '@nestjs/mapped-types';
import { CreateGate2AssumptionsDto } from './create-gate2-assumptions.dto';

export class UpdateGate2AssumptionsDto extends PartialType(CreateGate2AssumptionsDto) {}
