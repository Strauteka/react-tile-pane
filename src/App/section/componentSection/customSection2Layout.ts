import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import { TileBranchSubstance } from 'components'

export const rootPane: () => TileBranchSubstance = () => ({
  children: [
    { children: [{ children: [makeBearerString(sectionKeys.SubSection1)] }] },
    {
      grow: 2,
      isRow: true,
      children: [
        { children: [makeBearerString(sectionKeys.SubSection2)] },
        { children: [makeBearerString(sectionKeys.SubSection3)] },
      ],
    },
  ],
})
