import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import { TileBranchSubstance } from 'components'

export const rootPane: TileBranchSubstance = {
  children: [
    { grow: 0.5, children: [{ children: [sectionKeys.SubSection1] }] },
    {
      grow: 0.5,
      isRow: true,
      children: [
        { grow: 0.3, children: [sectionKeys.SubSection2] },
        { grow: 0.7, children: [sectionKeys.SubSection3] },
      ],
    },
  ],
}
