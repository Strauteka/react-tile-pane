import {
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  TileProviderContext,
  useGetLeaf,
  useGetRootNode,
} from 'components'
import React from 'react'
import { theme } from '../../demo/custom'
import { ContextProps, createTilePanes } from 'App/sectionConfiguration/section'
import { makeBearerString } from 'components/tilePane/view/Container/components/TilePanes/components/TilePane/Bearer'
import { named } from 'App/sectionConfiguration/named'
type CustomSection2State = { result: string }
type CustomSection2Props = {
  tileProviderContext: TileProviderContext
}

const style = {
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'auto',
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

export const OpenSection: React.FC<any> = (props: {
  context: TileProviderContext
  props: { call: (name: string) => {}; result: string }
}) => {
  const getLeaf = useGetLeaf()
  const leaf = getLeaf(props.props.result)
  const isShowing = !!leaf
  return (
    <div
      style={{ ...style, cursor: 'pointer', background: 'green' }}
      onClick={() => {
        if (
          props.context &&
          props.context.context &&
          props.context.context.context &&
          props.context.context.context.move
        ) {
          props.context.context.context.move(
            makeBearerString(props.props.result),
            [0, 0]
          )
        } else {
          console.log('Reference NOT FOUND!!')
        }
      }}
    >
      Open {props.props.result} section!
    </div>
  )
}

export const functionalTestBounce: React.FC<any> = (props: {
  props: { call: (name: string) => {}; result: string }
}) => {
  return <div style={style}>{props.props.result}</div>
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
      style={style}
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

  render = () => {
    const nodes = {
      SubSection1: functionalTestBounce,
      SubSection2: functionalTest,
      SubSection3: OpenSection,
    }

    const nodeList = createTilePanes(nodes)
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
              style={{ height: 'inherit', width: 'inherit' }}
              props={{
                result: this.state.result,
                call: (name: string) => {
                  this.setState({ result: name }, () => {
                    console.log('state done')
                  })
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
  // const getRootNode = useGetRootNode()
  // localStorage.setItem('SomeOtherKey1', JSON.stringify(getRootNode()))
  return <></>
}
