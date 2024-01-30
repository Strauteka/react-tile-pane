import React, { useState } from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  useGetRootNode,
  TileBranchSubstance,
} from 'components'
import { color, styles, theme } from './basic'
import '../demo/basic/styles.css'

import { named } from 'App/sectionConfiguration/named'
import { makeBearerString, unfoldBearer } from '../sectionConfiguration/Bearer'
import { PaneProvider } from 'App/sectionConfiguration/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { AppSelectionContext } from 'App/context/AppStateContext'

const localStorageKey = 'react-tile-pane-left-tab-layout'

function PaneIcon(props: { name: string; title: string }) {
  const getLeaf = useGetLeaf()
  const move = useMovePane()
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
        <DraggableTitle
          name={makeBearerString(props.name, { dragable: 'yes' })}
        >
          {props.title}
        </DraggableTitle>
      </div>
      <div
        onClick={() => {
          move(
            makeBearerString(props.name, { test: 'yes' }),
            isShowing ? null : [0, 0]
          )
        }}
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

export const AppInner: React.FC = () => {
  const [selection, setSelection] = useState('')
  const value = { selection, setSelection }
  const icons = Object.entries(named).reduce(
    (c: { [name: string]: string }, v) => {
      c[v[0]] = v[1].tabTitle
      return c
    },
    {}
  )
  const rootPane: TileBranchSubstance = {
    children: [{ children: [] }],
  }

  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane

  const middleManProvider: React.FC<TilePaneProviderProps> = (
    props: TilePaneProviderProps
  ) => {
    return (
      <PaneProvider
        {...props}
        styled={{
          ...props.styled,
        }}
        paneProps={{
          ...props.paneProps,
        }}
      />
    )
  }

  return (
    <AppSelectionContext.Provider value={value}>
    <TileProvider
      rootNode={root}
      {...theme(icons)}
      tilePaneProvider={{ paneProvider: middleManProvider }}
    >
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
            width: 'inherit',
            height: 'inherit',
            overflowY: 'hidden', // hide vertical
            overflowX: 'hidden',
          }}
        >
          <TileContainer style={styles.container} />
        </div>
      </div>
      <AutoSaveLayout />
      <div />
    </TileProvider>
    </AppSelectionContext.Provider >
  )
}

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}
