import { IsEmail, IsEnum, IsBoolean, IsOptional, IsObject } from 'class-validator';

export class CreatePermissionDto {
  @IsEmail()
  email: string;

  @IsEnum(['admin', 'pmo', 'project_manager', 'program_manager', 'portfolio_manager', 'viewer'])
  role: string;

  @IsObject()
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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  notes?: string;
}
