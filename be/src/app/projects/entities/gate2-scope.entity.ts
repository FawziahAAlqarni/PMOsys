import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('gate2_scope')
export class Gate2Scope extends BaseEntity {
  @Column()
  details: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
