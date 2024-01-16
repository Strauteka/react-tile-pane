import {
  MovePane,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  createTilePanes,
  useGetLeaf,
  useGetRootNode,
  useMovePane,
} from 'components'
import React, { ReactNode } from 'react'
import { styles, theme } from './custom'
type CustomSection2State = {input: string}
type CustomSection2Props = { movePane: { ref?: MovePane } }

const body = `asd12344`
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
    { children: [
      { children: 'SubSection1'}] },
    {
      grow: 2,
      children: [
        {
          isRow: true,
          children: [
            { children: 'SubSection2'},
            { children: 'SubSection3'},
          ],
        },
      ],
    },
  ],
}

export class CustomSection2 extends React.Component<
  CustomSection2Props,
  CustomSection2State
> {
  constructor(props: CustomSection2Props) {
    super(props)
  }
  shouldComponentUpdate(
    nextProps: CustomSection2Props,
    nextState: CustomSection2State
  ) {
    console.log('CustomSection shouldComponentUpdate', nextProps)
    return true
  }

  OpenSectionStuff = () => {
    const sectionX = 'lemon'
    const getLeaf = useGetLeaf()
    const leaf = getLeaf(sectionX)
    const isShowing = !!leaf
    console.log('@@@@@@@@@@@!!!!!!!!!!!!!!!!', isShowing, leaf)
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
        ClickME!
        <div
          onClick={() => {
            console.log('asd')
            if (this.props.movePane.ref) {
              this.props.movePane.ref(sectionX, [0, 0])
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

  render = () => {
    const nodes = {
      SubSection1: (
        <div style={style}>
          <div style={{ width: '500px' }}>{'test1' + body}</div>
        </div>
      ),
      SubSection2: <div style={style}>{'test2' + body}</div>,
      SubSection3: <div style={style}><this.OpenSectionStuff /></div>,
    }

    const [nodeList, names] = createTilePanes(nodes)
    console.log('rebuild view')
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
            <TileContainer style={styles.container} />
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
