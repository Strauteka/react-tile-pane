import { TileBranchSubstance, TileContainer, TileProvider } from 'components'
import React from 'react'
import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { PaneProvider } from 'App/sectionConfiguration/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { named } from 'App/sectionConfiguration/named'
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

  rootPane: TileBranchSubstance = {
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

  render = () => {
    const localRoot = localStorage.getItem('SomeOtherKey1')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : this.rootPane

    return (
        <TileProvider
          rootNode={root}
          tabBar={tabBarBuilder(
            { named, isDraggable: false, noBar: true },
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
