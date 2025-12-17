import { IsString } from 'class-validator';

export class CreateGate2ChangeCardDto {
  @IsString()
  change_details: string;

  @IsString()
  projectId: string;
}
