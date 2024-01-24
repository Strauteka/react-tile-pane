
export interface SectionConfiguration {
  tabTitle: string
}

export const named: { [name: string]: SectionConfiguration } = {
  customSection: {
    tabTitle: 'Custom section',
  },
  functionalSection: {
    tabTitle: '🥝',
  },
  pineapple: {
    tabTitle: '🍍',
  },
  lemon: {
    tabTitle: '🍋',
  },
  grape: {
    tabTitle: '🍇',
  },
}
