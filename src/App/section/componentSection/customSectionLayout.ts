import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import { TileBranchSubstance } from 'components'

export const rootPane: () => TileBranchSubstance = () => {
  return {
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
        children: [makeBearerString(sectionKeys.grape)],
      },
      {
        onTab: 2,
        children: [
          makeBearerString(sectionKeys.aaa),
          makeBearerString(sectionKeys.bbb),
          makeBearerString(sectionKeys.custom),
        ],
      },
    ],
  }
}
