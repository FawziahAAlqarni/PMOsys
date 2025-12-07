import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsString, IsDateString, IsNumber, Min, Max, IsOptional} from 'class-validator';
import {Portfolio} from '../entities/portfolio.enum';

export class CreatePortfolioTaskDto {
  @ApiProperty({
    enum: Portfolio,
    description: 'Portfolio identifier',
    example: Portfolio.HA,
  })
  @IsEnum(Portfolio)
  portfolioName: Portfolio;

  @ApiProperty({
    description: 'Name of the task',
    example: 'Implement authentication system',
  })
  @IsString()
  taskName: string;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2025-12-31',
    type: String,
  })
  @IsDateString()
  dueDate: Date;

  @ApiPropertyOptional({
    description: 'Completion percentage (0-100)',
    minimum: 0,
    maximum: 100,
    default: 0,
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage?: number;
}
