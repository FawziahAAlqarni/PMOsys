import {Entity, Column} from 'typeorm';
import {BaseEntity} from '../../common/entities/base.entity';

@Entity('project_cards')
export class ProjectCard extends BaseEntity {
  @Column()
  name: string;

  // TODO: Implement when User entity is created
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'manager_id' })
  // manager: User;

  @Column({type: 'decimal', precision: 10, scale: 2})
  estimatedBudget: number;

  // TODO: Implement when Program entity is created
  // @ManyToOne(() => Program, { nullable: true })
  // @JoinColumn({ name: 'program_id' })
  // program?: Program;

  @Column({type: 'int'})
  durationInWeeks: number;
}
