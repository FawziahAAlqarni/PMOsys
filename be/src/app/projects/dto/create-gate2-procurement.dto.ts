import { IsString, IsOptional } from 'class-validator';

export class CreateGate2ProcurementDto {
  @IsString()
  plan: string;

  @IsOptional()
  @IsString()
  options_analysis?: string;

  @IsString()
  projectId: string;
}
