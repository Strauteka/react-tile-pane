import React from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  useGetRootNode,
  TileBranchSubstance,
  // createTilePanes,
  TilePane,
  TileProviderContext,
} from 'components'
import { color, styles, theme } from  '../demo/basic'
import '../demo/basic/styles.css'


import { SectionConfiguration, configuration } from './SectionConfiguration'

const localStorageKey = 'react-tile-pane-left-tab-layout'

const mainContext: TileProviderContext = {
  superContext: undefined,
  moveRef: undefined,
}

export function createTilePanes<Keys extends string = string>(configuration: {
  [K in Keys]: SectionConfiguration<unknown>
}): TilePane[] {
  const tilePanes: TilePane[] = Object.entries(configuration)
    .map((entry) => ({ key: entry[0], value: entry[1] as any }))
    .map((entry) => {
      return { name: entry.key, child: entry.value.section }
    })

  return tilePanes
}

function PaneIcon(props: { name: string; title: string }) {
  const getLeaf = useGetLeaf()
  const move = useMovePane()
  mainContext.moveRef = move
  const leaf = getLeaf(props.name)
  const isShowing = !!leaf
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: 60,
        background: color.backL,
        fontSize: 25,
        padding: 10,
        color: '#ffffff',
        gap: '1rem',
      }}
    >
      <div style={{ cursor: 'move' }}>
        <DraggableTitle name={props.name}>{props.title}</DraggableTitle>
      </div>
      <div
        onClick={() => move(props.name, isShowing ? null : [0, 0])}
        style={{
          cursor: 'pointer',
          background: isShowing ? color.primary : color.secondary,
          width: 14,
          height: 14,
          borderRadius: 99,
        }}
      />
    </div>
  )
}

export const LeftTabDemo: React.FC = () => {
  const nodeList = createTilePanes(configuration)
  const icons = Object.entries(configuration).reduce(
    (c: { [name: string]: string }, v) => {
      c[v[0]] = v[1].tabTitle
      return c
    },
    {}
  )
  const rootPane: TileBranchSubstance = {
    children: [{ children: [] }],
  }

  console.log('rebuild view')
  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane

  return (
    <TileProvider tilePanes={nodeList} rootNode={root} {...theme(icons)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: color.backL,
          }}
        >
          {Object.entries(icons).map((name) => (
            <PaneIcon key={name[0]} name={name[0]} title={name[1]} />
          ))}
          {/* <CreateSection nodeList={nodeList}></CreateSection> */}
        </div>

        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <TileContainer style={styles.container} />
        </div>
      </div>
      <AutoSaveLayout />
      <div />
    </TileProvider>
  )
}

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}
