import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsOptional, IsArray, IsNumber, IsInt, Min} from 'class-validator';

export class CreateProjectCardDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Digital Transformation Initiative',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Estimated budget for the project (can be 0)',
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
  @IsInt()
  @Min(1)
  durationInWeeks: number;

  @ApiProperty({
    description: 'Project description',
    example: 'A comprehensive digital transformation project',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Learned lessons from previous projects',
    required: false,
  })
  @IsOptional()
  @IsString()
  learnedLessons?: string;

  @ApiProperty({
    description: 'Dependencies on other projects',
    required: false,
  })
  @IsOptional()
  @IsString()
  dependencies?: string;

  @ApiProperty({
    description: 'Technical committee members (list of user IDs)',
    required: false,
  })
  @IsOptional()
  @IsArray()
  technicalCommittee?: string[];

  @ApiProperty({
    description: 'Array of risks',
    required: false,
    default: [],
  })
  @IsOptional()
  @IsArray()
  risks?: Array<any>;

  // TODO: Add when foreign key entities are created
  // ownerId: string;
  // programId?: string;
  // portfolioId: string;
  // strategicObjectiveId?: string;
  // strategicOutcomeId?: string;
}
