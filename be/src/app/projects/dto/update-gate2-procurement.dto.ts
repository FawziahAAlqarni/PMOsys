import { PartialType } from '@nestjs/mapped-types';
import { CreateGate2ProcurementDto } from './create-gate2-procurement.dto';

export class UpdateGate2ProcurementDto extends PartialType(CreateGate2ProcurementDto) {}
