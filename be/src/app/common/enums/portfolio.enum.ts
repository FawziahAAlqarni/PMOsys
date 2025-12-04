/**
 * Portfolio types in the organization.
 * Used across multiple modules (PortfolioTask, ProjectCard, etc.)
 */
export enum Portfolio {
  HA = 'HA',   // Health Affairs
  MA = 'MA',   // Military Affairs
  EA = 'EA',   // Executive Affairs
  PMO = 'PMO', // Portfolio Management Office
}

/**
 * Human-readable names for each portfolio type.
 * Useful for UI display and reporting.
 */
export const PortfolioNames: Record<Portfolio, string> = {
  [Portfolio.HA]: 'Health Affairs',
  [Portfolio.MA]: 'Military Affairs',
  [Portfolio.EA]: 'Executive Affairs',
  [Portfolio.PMO]: 'Portfolio Management Office',
};
