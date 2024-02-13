import { SectionConfiguration } from './SectionConfiguration'

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
  editForm: {
    isSelection: false,
    tabTitle: 'Edit Form',
    characteristic: {
      into: 'right',
      grow: 0.25,
      movable: {
        bottom: false,
        top: false,
        left: false,
        right: false,
        center: false,
      },
    },
  },
  editFormSection: {
    isSelection: true,
    tabTitle: 'Edit Form Section',
  },
}

const namedKeys = typeof named

namedKeys
