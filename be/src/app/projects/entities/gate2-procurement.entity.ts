import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('gate2_procurement')
export class Gate2Procurement extends BaseEntity {
  @Column()
  plan: string;

  @Column({ nullable: true })
  options_analysis: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
