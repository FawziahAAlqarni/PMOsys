import { PartialType } from '@nestjs/mapped-types';
import { CreateGate2ChangeCardDto } from './create-gate2-change-card.dto';

export class UpdateGate2ChangeCardDto extends PartialType(CreateGate2ChangeCardDto) {}
