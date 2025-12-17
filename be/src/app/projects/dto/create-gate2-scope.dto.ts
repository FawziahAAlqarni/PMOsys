import { IsString } from 'class-validator';

export class CreateGate2ScopeDto {
  @IsString()
  details: string;

  @IsString()
  projectId: string;
}
