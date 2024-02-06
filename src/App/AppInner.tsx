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

import { named } from 'App/sectionConfiguration/named'
import { makeBearerString } from './sectionConfiguration/Bearer'
import { PaneProvider } from 'App/component/provider/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { AppSelectionContext } from 'App/context/AppSelectionContext'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { ContextStore, contextName } from 'App/store/global'
import { color } from 'App/component/tabBar/basic/styles'

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
        background: color.backL,
        fontSize: 20,
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

const middleManProvider: React.FC<TilePaneProviderProps> = (
  props: TilePaneProviderProps
) => {
  return (
    <PaneProvider
      {...props}
      styled={{
        ...props.styled,
      }}
    />
  )
}

export const AppInner: React.FC = () => {
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

  return (
    <TileProvider
      rootNode={root}
      tabBar={tabBarBuilder({ named, isDraggable: true })}
      stretchBar={StretchBar}
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
        </div>

        <div
          style={{
            width: 'inherit',
            height: 'inherit',
            overflowY: 'hidden',
            overflowX: 'hidden',
          }}
        >
          <TileContainer />
        </div>
      </div>
      <AutoSaveLayout />
      <ContextStore name={contextName.main} />
      <div />
    </TileProvider>
  )
}

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}
