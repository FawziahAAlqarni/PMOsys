import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('risk_register')
export class RiskRegister extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  stage: number; // المرحلة التي تم فيها تسجيل أو تحديث الخطر

  @Column({ nullable: true })
  status: string; // حالة الخطر (نشط، مغلق، ...)

  @Column({ nullable: true })
  change_log: string; // سجل التغييرات (يمكن أن يكون JSON)

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
