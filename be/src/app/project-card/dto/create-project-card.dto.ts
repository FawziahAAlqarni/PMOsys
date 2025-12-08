import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNumber, Min} from 'class-validator';

export class CreateProjectCardDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Digital Transformation Initiative',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Estimated budget for the project',
    example: 500000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  estimatedBudget: number;

  @ApiProperty({
    description: 'Project duration in weeks',
    example: 12,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  durationInWeeks: number;

  // TODO: Add when User and Program entities are created
  // managerId?: string;
  // programId?: string;
}
