import { CustomSection } from 'App/section/componentSection/CustomSection'
import { functionalTest } from 'App/section/functionalSection/functionalSection'
import {
  pineapple,
  lemon,
  grape,
} from 'App/section/reactNodeSection/ReactNodeSection'
import { Constr, SectionContext } from './SectionContext'
import {
  functionalTestX,
  OpenSection,
  functionalTestBounce,
  bbb,
  aaa,
} from 'App/section/other/customSectionPanes'
import { CustomSection2 } from 'App/section/componentSection/CustomSection2'
import { editFormProvider } from 'App/component/provider/EditFormProvider'
import { editFormSection } from 'App/section/functionalSection/editFormSection'
import { sectionKeys } from './SectionName'

export const section: {
  [name: string]:
    | React.ReactNode
    | Constr<React.Component<SectionContext<any>, any>>
    | React.FC<SectionContext<any>>
} = {
  [sectionKeys.customSection]: CustomSection,
  [sectionKeys.functionalSection]: functionalTest,
  [sectionKeys.pineapple]: pineapple,
  [sectionKeys.lemon]: lemon,
  [sectionKeys.grape]: grape,
  [sectionKeys.aaa]: aaa,
  [sectionKeys.bbb]: bbb,
  [sectionKeys.custom]: CustomSection2,
  [sectionKeys.SubSection1]: functionalTestBounce,
  [sectionKeys.SubSection2]: functionalTestX,
  [sectionKeys.SubSection3]: OpenSection,
  [sectionKeys.editForm]: editFormProvider,
  [sectionKeys.editFormSection]: editFormSection,
}
