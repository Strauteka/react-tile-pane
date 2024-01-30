import {
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  TileProviderContext,
} from 'components'
import React from 'react'
import { styles, theme } from '../../demo/notDragable'
import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { PaneProvider } from 'App/sectionConfiguration/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'

type CustomSectionState = {}
type CustomSectionProps = { tileProviderContext: TileProviderContext }

export const rootPane: TileBranchSubstance = {
  children: [
    { children: [makeBearerString('aaa')] },
    { onTab: 2, children: ['aaa', 'bbb', 'custom'] },
  ],
}

export class CustomSection extends React.Component<
  SectionContext<CustomSectionProps>,
  CustomSectionState
> {
  constructor(props: SectionContext<CustomSectionProps>) {
    super(props)
    console.log('constructor123124124')
  }

  render = () => {
    const localRoot = localStorage.getItem('SomeOtherKeyxxx')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane

    const middleManProvider: React.FC<TilePaneProviderProps> = (
      props: TilePaneProviderProps
    ) => {
      return (
        <PaneProvider {...props}
        styled={{ ...props.styled, ...{ border: '3px solid #000000' } }}/>
      )
    }
    return (
      <>
        <TileProvider
          rootNode={root}
          {...theme({ aaa: 'test1', bbb: 'test2', custom: 'test3' })}
          tilePaneProvider={{ paneProvider: middleManProvider }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <TileContainer
              context={this.props.context}
              style={styles.container}
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
  // localStorage.setItem('SomeOtherKeyxxx', JSON.stringify(getRootNode()))
  return <></>
}
