export enum Portfolio {
  HA = 'HA', // Health Affairs
  MA = 'MA', // Military Affairs
  EA = 'EA', // Executive Affairs
}

export const PortfolioNames: Record<Portfolio, string> = {
  [Portfolio.HA]: 'Health Affairs',
  [Portfolio.MA]: 'Military Affairs',
  [Portfolio.EA]: 'Executive Affairs',
};