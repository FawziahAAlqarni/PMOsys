import { IsString, IsOptional } from 'class-validator';

export class CreateGate2AssumptionsDto {
  @IsString()
  assumptions: string;

  @IsOptional()
  @IsString()
  constraints?: string;

  @IsString()
  projectId: string;
}
