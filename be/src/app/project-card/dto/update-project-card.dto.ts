import {PartialType} from '@nestjs/swagger';
import {CreateProjectCardDto} from './create-project-card.dto';

export class UpdateProjectCardDto extends PartialType(CreateProjectCardDto) {
}
