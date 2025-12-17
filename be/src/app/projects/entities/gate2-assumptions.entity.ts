import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('gate2_assumptions')
export class Gate2Assumptions extends BaseEntity {
  @Column()
  assumptions: string;

  @Column({ nullable: true })
  constraints: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
