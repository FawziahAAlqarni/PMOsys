import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('gate2_change_card')
export class Gate2ChangeCard extends BaseEntity {
  @Column()
  change_details: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
