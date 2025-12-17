import { PartialType } from '@nestjs/mapped-types';
import { CreateGate2ScopeDto } from './create-gate2-scope.dto';

export class UpdateGate2ScopeDto extends PartialType(CreateGate2ScopeDto) {}
