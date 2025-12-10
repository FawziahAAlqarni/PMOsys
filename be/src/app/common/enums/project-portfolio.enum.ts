export enum ProjectPortfolio {
  HA = 'HA',
  MA = 'MA',
  EA = 'EA',
  LA = 'LA',
  MNGDP = 'MNGDP',
}

export const ProjectPortfolioNames: Record<ProjectPortfolio, string> = {
  [ProjectPortfolio.HA]: 'Health Affairs',
  [ProjectPortfolio.MA]: 'Military Affairs',
  [ProjectPortfolio.EA]: 'Executive Affairs',
  [ProjectPortfolio.LA]: 'Localization Affairs',
  [ProjectPortfolio.MNGDP]: 'MNGDP Stream',
};
