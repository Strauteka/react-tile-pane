import { useAppScopeState } from 'App/context/AppScopeStateContext'
import { useAppState, useScopedMovePane } from 'App/context/AppStateContext'
import { useEditFormState } from 'App/context/EditFormStateContext'
import { makeBearerString, unfoldBearer } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { named } from 'App/sectionConfiguration/named'
import { contextName } from 'App/store/global'
import { MovePane } from 'components'
import { useEffect } from 'react'

const style = {
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'auto',
} as any

const body = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis dui et libero iaculis aliquet. Suspendisse ultrices nisi vel hendrerit pretium. Phasellus eu mi ornare, venenatis nisi id, fermentum diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec varius nisl et nunc faucibus, quis sagittis quam pulvinar. Fusce vel auctor dui. Donec vehicula cursus est, tempus condimentum lectus accumsan ac.

Vivamus bibendum ante feugiat blandit sollicitudin. Vivamus sit amet iaculis enim, eget congue libero. Pellentesque gravida suscipit sollicitudin. Fusce accumsan lectus ac efficitur iaculis. Mauris at luctus orci, sit amet viverra justo. Nam tortor massa, posuere ut malesuada et, suscipit ut lorem. Aliquam eget nisl orci. Integer imperdiet arcu a scelerisque varius. Maecenas molestie dapibus dictum. Aliquam dapibus ultricies velit, sit amet commodo velit finibus at.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris lacinia nisl id suscipit iaculis. Donec nec ornare odio. Nunc vehicula euismod urna. Phasellus vestibulum, neque non porta bibendum, odio nisl consequat ante, eu auctor nulla risus eu justo. Integer a hendrerit felis, nec ultrices quam. In placerat dignissim dignissim. Integer cursus aliquam lectus vitae tristique. Duis accumsan urna leo, sed laoreet diam posuere at. Praesent porttitor pharetra odio eu ultricies. Cras fringilla, mauris vitae imperdiet pulvinar, neque nulla sagittis arcu, ut scelerisque massa turpis eget erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Suspendisse rutrum eget purus non laoreet. Duis vitae quam vestibulum, congue neque fringilla, aliquam nisi. Pellentesque luctus facilisis tristique. Etiam aliquam augue sed aliquam rhoncus. Donec nisi eros, congue maximus ultrices sit amet, venenatis non nisl. Praesent libero nunc, luctus eget aliquam eu, scelerisque sed ipsum. Nulla scelerisque ex ut nibh malesuada, in interdum dui scelerisque. Etiam iaculis auctor odio, a suscipit urna dignissim id. Donec tincidunt justo quis mauris euismod finibus. Vivamus cursus eros ligula, eget condimentum nisl tempus ultricies. Duis auctor nunc sed lectus dapibus rhoncus.

Vivamus vestibulum ultrices arcu in vestibulum. Nunc porta bibendum risus, vitae bibendum felis lobortis id. In quis rhoncus orci. Nulla id ultricies purus. Cras ut nibh eget turpis rutrum interdum quis in elit. Proin mollis volutpat nisi id accumsan. Phasellus sodales nec tellus mollis commodo. Quisque sed sodales nunc. Proin vulputate risus varius aliquam posuere.`

export const OpenSection: React.FC<any> = (props: SectionContext<{}>) => {
  const { appScopeState } = useAppScopeState()
  // const movePane: MovePane = useScopedMovePane(appScopeState.scopeName)
  const movePane: MovePane = useScopedMovePane(contextName.main)
  return (
    <div
      style={{ ...style, cursor: 'pointer', background: 'green' }}
      onClick={() => {
        if ((props?.parent as any)?.selectedValue) {
          movePane(
            makeBearerString((props.parent as any).selectedValue),
            [0.0, 0.5]
          )
        }
      }}
    >
      Open {JSON.stringify(props.parent)} section!
    </div>
  )
}

export const functionalTestBounce: React.FC<any> = (props: {
  props: { call: (name: string) => {}; result: string }
}) => {
  return <div style={style}>{123214}</div>
}

export const functionalTestX: React.FC<any> = (props: SectionContext<{}>) => {
  const { setAppState } = useAppState()
  const fuits = Object.entries(named).map((entry, idx) => {
    return (
      <div key={idx}>
        <input type="radio" value={entry[0]} name={props.pane.name} />{' '}
        {entry[1].tabTitle}
      </div>
    )
  })
  const { setEditFormState } = useEditFormState()
  //same as component did mount!
  useEffect(() => {
    setEditFormState(props.pane.name, {
      render: (
        <div
          onClick={() => {
            console.log('clicked1')
          }}
          style={{ height: '100%', backgroundColor: 'green' }}
        >
          NONSELECTION
        </div>
      ),
    })
  }, [props.pane.name])

  return (
    <div
      style={style}
      onChange={(ev) => {
        console.log('setState', props.pane.name)
        const value = (ev.target as HTMLInputElement).value
        setAppState(props.pane.name, {
          selectedValue: value,
        })
        setEditFormState(props.pane.name, {
          render: (
            <div
              onClick={() => {
                console.log('clicked2')
              }}
              style={{
                //marginBlockStart: '0em',// chrome adds
                height: '100%',
                backgroundColor: value.length > 5 ? 'blue' : 'red',
              }}
            >
              Hello there {value}
            </div>
          ),
        })
      }}
    >
      {fuits}
    </div>
  )
}

export const aaa = (
  <div style={style}>
    <div style={{ width: '31.25em' }}>{'test1' + body}</div>
  </div>
)
export const bbb = <div style={style}>{'test2' + body}</div>
