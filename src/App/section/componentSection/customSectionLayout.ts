import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import { TileBranchSubstance } from 'components'

export const rootPane: TileBranchSubstance = {
  characteristic: {
    movable: {
      center: false,
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
  },
  children: [
    {
      characteristic: {
        movable: {
          center: false,
          left: false,
          right: false,
          top: false,
          bottom: false,
        },
      },
      grow:0.5,
      children: [sectionKeys.grape],
    },
    {
      onTab: 2,
      children: [sectionKeys.aaa, sectionKeys.bbb, sectionKeys.custom],
    },
  ],
}
