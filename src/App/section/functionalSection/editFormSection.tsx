import { useEditFormState } from 'App/context/EditFormStateContext'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { useEffect, useState } from 'react'
import { EditFormDefault } from '../editForm/EditFormDefault'
import React from 'react'

const style = {
  minWidth: '100px',
  width: '100%',
  height: '100%',
} as any

const x = (element: any) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {element}
    </div>
  )
}
type PanelData = {
  id: number
  name: string
  surname: string
  age: number
}
export const editFormSection: React.FC<SectionContext<{}>> = (
  props: SectionContext<{}>
) => {
  const [selection, setSelection] = useState('')
  const persons: PanelData[] = [
    { id: 1, name: 'Joe', surname: 'Doe', age: 42 },
    { id: 2, name: 'Anna', surname: 'Forest', age: 72 },
  ]

  const { setEditFormState } = useEditFormState()
  const personRadio = persons.map((entry, idx) => {
    const editStateObject = { getState: undefined }
    const getEditState = () => {
      return editStateObject
    }
    
    return (
      <div key={entry.id}>
        <input
          type="radio"
          value={entry.id}
          name={String(entry.id)}
          checked={selection === String(entry.id)}
          onChange={(ev) => {
            const value = (ev.target as HTMLInputElement).value
            setSelection(value)
            const person = getPerson(persons, value)
            setEditFormState(props.pane.name, {
              render: (
                <EditFormDefault<PanelData>
                  editData={person}
                  key={person?.id}
                  getEditState={getEditState}
                  onSave={(oldData, newData) => {
                    alert(
                      `OldData:  ${JSON.stringify(
                        oldData
                      )} NewData: ${JSON.stringify(newData)}`
                    )
                  }}
                />
              ),
            })
          }}
        />
        {entry.name + ' ' + entry.surname}
      </div>
    )
  })

  const getPerson = (data: PanelData[], id: string): PanelData | undefined => {
    return data.find((entry) => id === String(entry.id))
  }

  return x(<div style={style}>{personRadio}</div>)
}
