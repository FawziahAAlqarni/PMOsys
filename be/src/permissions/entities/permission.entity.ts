import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'pmo', 'project_manager', 'program_manager', 'portfolio_manager', 'viewer'],
    default: 'viewer'
  })
  role: string;

  @Column('json', { nullable: true })
  permissions: {
    canViewProjects: boolean;
    canCreateProjects: boolean;
    canEditProjects: boolean;
    canDeleteProjects: boolean;
    canApproveProjects: boolean;
    canManageUsers: boolean;
    canViewReports: boolean;
    canManagePermissions: boolean;
  };

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
