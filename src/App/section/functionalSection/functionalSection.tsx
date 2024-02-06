import { useEditFormState } from 'App/context/EditFormStateContext'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { useEffect, useState } from 'react'

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
export const functionalTest: React.FC<SectionContext<{}>> = (
  props: SectionContext<{}>
) => {
  const [count, setCount] = useState(0)
  const { setEditFormState } = useEditFormState()
  //same as component did mount!
  useEffect(() => {
    setEditFormState(props.pane.name, {
      render: (
        <div
          onClick={() => {
            setCount(count + 1,)
        
          }}
        >
          <div>
          initial state of {props.pane.name}
          </div>
          {count}
        </div>
      ),
    })
  }, [props.pane.name, count])

  return x(
    <div   onClick={() => {
      setCount(count + 1,)
  
    }} style={style}>
      {'kiwifruit Simple FunctionalComponentTEst!:' +  count }
    </div>
  )
}
