import React from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  useGetRootNode,
  TileBranchSubstance,
  TileCharacteristic,
  TileLeaf,
} from 'components'

import { named } from 'App/sectionConfiguration/named'
import { makeBearerString, unfoldBearer } from './sectionConfiguration/Bearer'
import { PaneProvider } from 'App/component/provider/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { ContextStore, contextName } from 'App/store/global'
import { color } from 'App/component/tabBar/basic/styles'

const localStorageKey = 'react-tile-pane-left-tab-layout'

function PaneIcon(props: {
  name: string
  title: string
  characteristic?: TileCharacteristic
}) {
  const bearer = makeBearerString(
    props.name,
    props.name === 'editForm' ? props.name : undefined,
    {}
  )
  const getLeaf = useGetLeaf()
  const move = useMovePane()
  const leaf = getLeaf(bearer)
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
        width: '250px',
      }}
    >
      <div style={{ cursor: 'move' }}>
        <DraggableTitle
          name={makeBearerString(props.name, props.name, {})}
          characteristic={props.characteristic}
        >
          {props.title}
        </DraggableTitle>
      </div>
      <div
        onClick={() => {
          // if (!isShowing) {
          move(bearer, isShowing ? null : [0, 0], props.characteristic)
          // }
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
  const rootPane: TileBranchSubstance = {
    characteristic: {
      movable: {
        top: false,
        bottom: false,
        left: true,
        right: false,
        center: true,
      },
    },
    children: [],
  }

  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane

  return (
    <TileProvider
      rootNode={root}
      tabBar={tabBarBuilder(
        { named, isDraggable: true },
        {
          thicknessOverride: (leaf?: TileLeaf) => {
            if (leaf) {
              const bearer = unfoldBearer(leaf.children[leaf.onTab])
              if (bearer.paneName === 'editForm') {
                return 0
              }
            }
          },
        }
      )}
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
          {Object.entries(named).map((name) => (
            <PaneIcon
              key={name[0]}
              name={name[0]}
              title={name[1].tabTitle}
              characteristic={name[1].characteristic}
            />
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
      {/* <AutoSaveLayout /> */}
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
