// Core Types
export type Portfolio = 'HA' | 'MA' | 'EA' | 'PMO';
export type ViewType = 'portfolio' | 'analytics' | 'project_details';
export type ProjectStatus = 'active' | 'completed';

// Risk Types
export type RiskType = 'Threat' | 'Opportunity';
export type ResponseType = 'Mitigate' | 'Avoid' | 'Transfer' | 'Accept';
export type RiskPhase = 'Elaboration' | 'Execution' | 'Closing';
export type RiskStatus = 'Open' | 'Closed';

export type ImpactScope =
  | 'الاستراتيجية'
  | 'المالية'
  | 'التشغيلية'
  | 'القدرات'
  | 'الالتزام'
  | 'التقنية والبيانات'
  | 'السمعة'
  | 'الأشخاص';

export interface Risk {
  id: number;
  title: string;
  description: string;
  impactScope: ImpactScope | '';
  subImpactScope: string;
  type: RiskType;
  responseType: ResponseType;
  probability: number; // 1-5
  impact: number; // 1-5
  mitigationPlan: string;
  phase: RiskPhase;
  status: RiskStatus;
  occurrenceIndicator: string;
  occurrenceDate: string;
  isChallenge: boolean;
}

// Charter Types
export interface CharterData {
  projectManager: string;
  strategicObj: string;
  strategicRes: string;
  programName: string;
  programManager: string;
  portfolio: string;
  portfolioManager: string;
  dependencies: string;
  techCommittee: string;
}

// Gate/Requirement Types
export type RequirementType = 'charter_form' | 'risk_register' | 'checkbox';

export interface Requirement {
  txt: string;
  type: RequirementType;
  done: boolean;
}

export interface Gate {
  name: string;
  subTitle: string;
  icon: string;
  requirements: Requirement[];
}

// Project Type
export interface Project {
  id: number;
  name: string;
  projectManager: string,
  description: string;
  charterData: Partial<CharterData>;
  risks: Risk[];
  currentGateIndex: number;
  gates: Gate[];
  status: ProjectStatus;
}

// Form Data Types
export interface CharterFormData {
  name: string;
  desc: string;
  manager: string;
  strategicObj: string;
  strategicRes: string;
  portfolio: string;
  portfolioManager: string;
  progName: string;
  progManager: string;
  dependencies: string;
  techCommittee: string;
}

export interface RiskFormData {
  title: string;
  desc: string;
  scope: ImpactScope | '';
  subScope: string;
  type: RiskType;
  response: ResponseType;
  prob: number;
  impact: number;
  mitigation: string;
  phase: RiskPhase;
  status: RiskStatus;
  indicator: string;
  indDate: string;
  isChallenge: boolean;
}

// Component Props Types
export interface NavbarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onReset: () => void;
}

export interface PortfolioViewProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onSelectProject: (id: number) => void;
}

export interface ProjectDetailsViewProps {
  project: Project;
  onUpdateProject: (project: Project) => void;
  onBack: () => void;
  openCharter: () => void;
  openRisks: () => void;
}

export interface RequirementItemProps {
  req: Requirement;
  onToggle: () => void;
  openCharter: () => void;
  openRisks: () => void;
}

export interface AnalyticsViewProps {
  projects: Project[];
}

export interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (name: string, desc: string) => void;
}

export interface CharterModalProps {
  project: Project;
  onClose: () => void;
  onSave: (updates: { name: string; description: string; projectManager: string; charterData: Partial<CharterData> }) => void;
}

export interface RiskRegisterModalProps {
  project: Project;
  onClose: () => void;
  onSaveRisks: (risks: Risk[]) => void;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

export interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
