
export interface SectionConfiguration {
  isSelection: boolean,
  tabTitle: string
}

export const named: { [name: string]: SectionConfiguration } = {
  customSection: {
    isSelection: false,
    tabTitle: 'Custom section',
  },
  functionalSection: {
    isSelection: true,
    tabTitle: '🥝',
  },
  pineapple: {
    isSelection: true,
    tabTitle: '🍍',
  },
  lemon: {
    isSelection: true,
    tabTitle: '🍋',
  },
  grape: {
    isSelection: true,
    tabTitle: '🍇',
  },
  aaa: {
    isSelection: true,
    tabTitle: '🍇',
  },
  bbb: {
    isSelection: true,
    tabTitle: '🍇',
  },
  ccc: {
    isSelection: true,
    tabTitle: '🍇',
  },
  SubSection1: {
    isSelection: true,
    tabTitle: '🍇',
  },
  SubSection2: {
    isSelection: true,
    tabTitle: '🍇',
  },
  SubSection3: {
    isSelection: true,
    tabTitle: '🍇',
  },

}