import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNumber, Min} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Digital Transformation Initiative',
  })
  @IsString()
  name: string;

  //TODO: add project manager ID
  // managerId?: string;

}
