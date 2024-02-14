import { TileCharacteristic } from 'components'
import { sectionKeys } from './SectionName'

export interface SectionConfiguration {
  tabTitle: string
  isSelection?: boolean //default true
  isParentPropsPersistent?: boolean //default false
  characteristic?: TileCharacteristic
}

export const mainSectionConfiguration: { [name: string]: SectionConfiguration } = {
  [sectionKeys.customSection]: {
    isSelection: false,
    tabTitle: 'Custom section',
  },
  [sectionKeys.functionalSection]: {
    isSelection: true,
    tabTitle: '🥝',
    characteristic: {
      movable: {
        bottom: false,
        top: false,
        left: true,
        right: true,
        center: true,
      },
    },
  },
  [sectionKeys.pineapple]: {
    isSelection: true,
    tabTitle: '🍍',
  },
  [sectionKeys.lemon]: {
    isSelection: true,
    tabTitle: '🍋',
  },
  [sectionKeys.grape]: {
    isSelection: true,
    tabTitle: '🍇',
  },
  [sectionKeys.aaa]: {
    isSelection: true,
    tabTitle: 'aaa',
  },
  [sectionKeys.bbb]: {
    isSelection: true,
    tabTitle: 'bbb',
  },
  [sectionKeys.SubSection1]: {
    isSelection: true,
    tabTitle: 'SubSection1',
  },
  [sectionKeys.SubSection2]: {
    isSelection: true,
    tabTitle: 'SubSection2',
  },
  [sectionKeys.SubSection3]: {
    isParentPropsPersistent: false,
    tabTitle: 'SubSection3',
  },
  [sectionKeys.custom]: {
    isSelection: false,
    tabTitle: 'custom',
  },
  [sectionKeys.editForm]: {
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
  [sectionKeys.editFormSection]: {
    isSelection: true,
    tabTitle: 'Edit Form Section',
  },
}
