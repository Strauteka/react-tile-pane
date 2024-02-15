import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import { TileBranchSubstance } from 'components'

export const rootPane: TileBranchSubstance = {
  children: [
    { children: [{ children: [sectionKeys.SubSection1] }] },
    {
      grow: 2,
      isRow: true,
      children: [
        { children: [sectionKeys.SubSection2] },
        { children: [sectionKeys.SubSection3] },
      ],
    },
  ],
}
