import React, { useContext } from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  TileCharacteristic,
  TileLeaf,
  TileBranchesContext,
  TileBranch,
  Into,
  PaneWithPreBox,
  TileLeavesContext,
} from 'components'

import { makeBearerString, unfoldBearer } from './sectionConfiguration/Bearer'
import { PaneProvider } from 'App/component/provider/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { ContextStore, contextName } from 'App/store/global'
import { color } from 'App/component/tabBar/basic/styles'
import { mainSectionConfiguration } from './sectionConfiguration/MainSectionConfiguration'
import { rootPane } from './sectionConfiguration/MainSectionLayout'
import { sectionKeys } from './sectionConfiguration/SectionName'
import { SaveLayout, getLayout } from './sectionConfiguration/LayoutSave'
import { getClosedPane, useClosedPane } from './context/ClosedPaneStateContext'

const localStorageKey = 'rootLayout'

const buildPreBox = (
  tileNode?: TileLeaf | TileBranch,
  into?: Into
): PaneWithPreBox | undefined => {
  if (tileNode && into) {
    const tileType: string = tileNode instanceof TileBranch ? 'branch' : 'leaf'
    return {
      [tileType]: {
        target: tileNode,
        into: into,
      },
    }
  }
}

function PaneIcon(props: {
  name: string
  title: string
  characteristic?: TileCharacteristic
}) {
  const bearer = makeBearerString(
    props.name,
    props.name === sectionKeys.editForm ? props.name : undefined,
    {}
  )
  const getLeaf = useGetLeaf()
  const move = useMovePane()
  const leaf = getLeaf(bearer)
  const Branches = useContext(TileBranchesContext)
  const mainLeaf = useContext(TileLeavesContext).find((leaf) =>
    leaf.children.find(
      (child) => unfoldBearer(child).paneName !== sectionKeys.editForm
    )
  )
  const ClosedPane = useClosedPane()
  const closedPaneState = getClosedPane()
  const preBox =
    props.name === sectionKeys.editForm
      ? buildPreBox(Branches[0], 'right')
      : buildPreBox(mainLeaf, 'center')
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
          ClosedPane(leaf, props.name)
          move(
            bearer,
            leaf ? null : [0, 0],
            {
              ...props.characteristic,
              ...(props.name === sectionKeys.editForm
                ? closedPaneState(props.name)
                : {}),
            },

            preBox
          )
        }}
        style={{
          cursor: 'pointer',
          background: leaf ? color.primary : color.secondary,
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
  return (
    <TileProvider
      rootNode={getLayout(localStorageKey, rootPane)}
      tabBar={tabBarBuilder(
        { sectionConfiguration: mainSectionConfiguration, isDraggable: true },
        {
          thicknessOverride: (leaf?: TileLeaf) => {
            if (leaf && leaf.children.length > 0) {
              const bearer = unfoldBearer(leaf.children[leaf.onTab])
              if (bearer.paneName === sectionKeys.editForm) {
                return 0
              }
            } else {
              return 0
            }
            return undefined
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
          {Object.entries(mainSectionConfiguration).map((name) => (
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
      <SaveLayout pane={localStorageKey} saveLayout={false} />
      <ContextStore name={contextName.main} />
      <div />
    </TileProvider>
  )
}
