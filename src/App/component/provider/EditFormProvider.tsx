import { useSelection } from 'App/context/AppSelectionContext'
import { useEditFormState } from 'App/context/EditFormStateContext'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'

export const editFormProvider: React.FC<SectionContext<{}>> = (
  props: SectionContext<{}>
) => {
  const { editFormState } = useEditFormState()
  const { selection } = useSelection()
  const selectedPaneEditForm = editFormState[selection]
  return (
    <>
      {selectedPaneEditForm?.render ? (
        selectedPaneEditForm.render
      ) : (
        <div style={{ padding: '0.2em' }}>Some default noFORM?</div>
      )}
    </>
  )
}
