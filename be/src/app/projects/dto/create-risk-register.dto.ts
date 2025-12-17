import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRiskRegisterDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  stage?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  change_log?: string;

  @IsString()
  projectId: string;
}
