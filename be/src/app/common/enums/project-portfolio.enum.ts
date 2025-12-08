/**
 * Portfolio types in the organization.
 * Used across multiple modules (PortfolioTask, ProjectCard, etc.)
 */
export enum ProjectPortfolio {
  HA = 'HA',   // Health Affairs
  MA = 'MA',   // Military Affairs
  EA = 'EA',   // Executive Affairs
  MNGDP = 'MNGDP', // Portfolio Management Office
}

/**
 * Human-readable names for each portfolio type.
 * Useful for UI display and reporting.
 */
export const ProjectPortfolioNames: Record<ProjectPortfolio, string> = {
  [ProjectPortfolio.HA]: 'Health Affairs',
  [ProjectPortfolio.MA]: 'Military Affairs',
  [ProjectPortfolio.EA]: 'Executive Affairs',
  [ProjectPortfolio.MNGDP]: 'MNGDP Stream',
};
