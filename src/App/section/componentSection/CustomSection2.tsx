import { TileBranchSubstance, TileContainer, TileProvider } from 'components'
import React from 'react'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { PaneProvider } from 'App/component/provider/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { mainSectionConfiguration } from 'App/sectionConfiguration/MainSectionConfiguration'
import { rootPane } from './customSection2Layout'
type CustomSection2State = { result: string }
type CustomSection2Props = {}

export class CustomSection2 extends React.Component<
  SectionContext<CustomSection2Props>,
  CustomSection2State
> {
  constructor(props: SectionContext<CustomSection2Props>) {
    super(props)
    this.state = { result: 'initial stuff!' }
    console.log('CONSTRUCTOR!!!!! CustomSection2Props')
  }

  middleManProvider: React.FC<TilePaneProviderProps> = (
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

  render = () => {
    const localRoot = localStorage.getItem('SomeOtherKey1')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane()

    return (
      <TileProvider
        rootNode={root}
        tabBar={tabBarBuilder(
          { sectionConfiguration: mainSectionConfiguration, isDraggable: false },
          { thickness: 0 }
        )}
        stretchBar={StretchBar}
        tilePaneProvider={{ paneProvider: this.middleManProvider }}
      >
        <TileContainer />
        <AutoSaveLayout />
        <div />
      </TileProvider>
    )
  }
}
function AutoSaveLayout() {
  // const getRootNode = useGetRootNode()
  // localStorage.setItem('SomeOtherKey1', JSON.stringify(getRootNode()))
  return <></>
}
