export interface SectionConfiguration {
  isSelection?: boolean //default true
  isParentPropsPersistent?: boolean //default false
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
    tabTitle: 'aaa',
  },
  bbb: {
    isSelection: true,
    tabTitle: 'bbb',
  },
  ccc: {
    isSelection: false,
    tabTitle: 'ccc',
  },
  SubSection1: {
    isSelection: true,
    tabTitle: 'SubSection1',
  },
  SubSection2: {
    isSelection: true,
    tabTitle: 'SubSection2',
  },
  SubSection3: {
    isParentPropsPersistent: false,
    tabTitle: 'SubSection3',
  },
  custom: {
    isSelection: false,
    tabTitle: 'custom',
  },
}
