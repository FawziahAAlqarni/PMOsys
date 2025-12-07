import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsDateString, IsNumber, Min, Max, IsOptional} from 'class-validator';

export class UpdatePortfolioTaskDto {
  @ApiPropertyOptional({
    description: 'Name of the task',
    example: 'Implement authentication system',
  })
  @IsOptional()
  @IsString()
  taskName?: string;

  @ApiPropertyOptional({
    description: 'Due date for the task',
    example: '2025-12-31',
    type: String,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'Completion percentage (0-100)',
    minimum: 0,
    maximum: 100,
    example: 75,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage?: number;
}