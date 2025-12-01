export enum Portfolio {
  HA = 'HA', // Health Affairs
  MA = 'MA', // Military Affairs
  EA = 'EA', // Executive Affairs
  PMO = 'PMO', // Executive Affairs
}

export const PortfolioNames: Record<Portfolio, string> = {
  [Portfolio.HA]: 'Health Affairs',
  [Portfolio.MA]: 'Military Affairs',
  [Portfolio.EA]: 'Executive Affairs',
  [Portfolio.PMO]: 'Portfolio Management Office',
};