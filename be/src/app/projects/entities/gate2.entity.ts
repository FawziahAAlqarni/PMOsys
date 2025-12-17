import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('gate2')
export class Gate2 extends BaseEntity {
  @Column()
  form_name: string;

  @Column({ nullable: true })
  data: string; // يمكن تعديل النوع لاحقاً حسب نوع بيانات النموذج

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
