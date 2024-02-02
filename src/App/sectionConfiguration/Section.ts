import { CustomSection } from 'App/section/componentSection/CustomSection'
import { functionalTest } from 'App/section/functionalSection/functionalSection'
import {
  pineapple,
  lemon,
  grape,
} from 'App/section/reactNodeSection/ReactNodeSection'
import { Constr, SectionContext } from './SectionContext'
import { functionalTestX,  OpenSection, functionalTestBounce, bbb, aaa  } from 'App/section/other/customSectionPanes'
import { CustomSection2 } from 'App/section/componentSection/CustomSection2'



export const section: {
  [name: string]:
    | React.ReactNode
    | Constr<React.Component<SectionContext<any>, any>>
    | React.FC<SectionContext<any>>
} = {
  customSection: CustomSection,
  functionalSection: functionalTest,
  pineapple: pineapple,
  lemon: lemon,
  grape: grape,
  aaa:  aaa,
  bbb: bbb,
  custom: CustomSection2,
  SubSection1: functionalTestBounce,
  SubSection2: functionalTestX,
  SubSection3: OpenSection
}


