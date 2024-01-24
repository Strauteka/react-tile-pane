import {
  MovePane,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  TileProviderContext,
  useGetLeaf,
  useGetRootNode,
} from 'components'
import React from 'react'
import { styles, theme } from '../../demo/custom'
import { ContextProps, createTilePanes } from 'App/sectionConfiguration/section'
import { makeBearerString } from 'components/tilePane/view/Container/components/TilePanes/components/TilePane/Bearer'
import { named } from 'App/sectionConfiguration/named'
type CustomSection2State = { result: string }
type CustomSection2Props = {
  tileProviderContext: TileProviderContext
}

const style = {
  //   minWidth: '200px',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'auto',
  boxSizing: 'content-box',
} as any

export const rootPane: TileBranchSubstance = {
  children: [
    { children: [{ children: [makeBearerString('SubSection1')] }] },
    {
      grow: 2,
      isRow: true,
      children: [
        { children: [makeBearerString('SubSection2')] },
        { children: [makeBearerString('SubSection3')] },
      ],
    },
  ],
}

export const OpenSection: React.FC<any> = (

  props: {
    context: TileProviderContext
    props: { call: (name: string) => {}; result: string }
  }
) => {
  const getLeaf = useGetLeaf()
  const leaf = getLeaf(props.props.result)
  const isShowing = !!leaf
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: 60,
        background: 'red',
        fontSize: 25,
        padding: 10,
        color: '#ffffff',
        gap: '1rem',
      }}
    >
      Open {props.props.result} section!
      <div
        onClick={() => {
          if (
            props.context &&
            props.context.context &&
            props.context.context.context&&
            props.context.context.context.moveRef 
            
          ) {
            props.context.context.context.moveRef(
              makeBearerString(props.props.result),
              [0, 0]
            )
          } else {
            console.log('Reference NOT FOUND!!')
          }
        }}
        style={{
          cursor: 'pointer',
          background: 'green',
          width: 14,
          height: 14,
          borderRadius: 99,
        }}
      />
    </div>
  )
}

export const functionalTestBounce: React.FC<any> = (props: {
  props: { call: (name: string) => {}; result: string }
}) => {
  return <div>{props.props.result}</div>
}

export const functionalTest: React.FC<any> = (props: {
  props: { call: (name: string) => {}; result: string }
}) => {
  const fuits = Object.entries(named).map((entry, idx) => {
    return (
      <div key={idx}>
        <input type="radio" value={entry[0]} name="fruit" /> {entry[1].tabTitle}
      </div>
    )
  })

  return (
    <div
      onChange={(ev) => {
        props.props.call((ev.target as HTMLInputElement).value)
        console.log('click', (ev.target as HTMLInputElement).value)
      }}
    >
      {fuits}
    </div>
  )
}

export class CustomSection2 extends React.Component<
  ContextProps<CustomSection2Props>,
  CustomSection2State
> {
  constructor(props: ContextProps<CustomSection2Props>) {
    super(props)
    this.state = { result: 'initial stuff!' }
    console.log('CONSTRUCTOR!!!!! CustomSection2Props')
  }
  shouldComponentUpdate(
    nextProps: ContextProps<CustomSection2Props>,
    nextState: CustomSection2State
  ) {
    console.log(
      '11111111111111CustomSection shouldComponentUpdate',
      this.constructor.name
    )
    return true
  }

  render = () => {
    const nodes = {
      SubSection1: functionalTestBounce,
      SubSection2: functionalTest,
      SubSection3: OpenSection
    }

    const nodeList = createTilePanes(nodes)
    console.log('rebuild view', this.state.result)
    const localRoot = localStorage.getItem('SomeOtherKey1')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane
    return (
      <>
        <TileProvider
          tilePanes={nodeList}
          rootNode={root}
          {...theme({
            SubSection1: 'SubSection1',
            SubSection2: 'SubSection2',
            SubSection3: 'SubSection3',
          })}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}
          >
            <TileContainer
              context={this.props.context}
              style={styles.container}
              props={{
                result: this.state.result,
                call: (name: string) => {
                  this.setState({ result: name }, () => {
                    console.log('state done')
                  })
                  console.log('aaasss!', name)
                },
              }}
            />
          </div>
          <AutoSaveLayout />
          <div />
        </TileProvider>
      </>
    )
  }
}
function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem('SomeOtherKey1', JSON.stringify(getRootNode()))
  return <></>
}
