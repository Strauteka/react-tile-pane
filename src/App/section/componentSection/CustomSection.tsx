import { TileBranchSubstance, TileContainer, TileProvider } from 'components'
import React from 'react'
import { styles, theme } from '../../demo/notDragable'
import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { PaneProvider } from 'App/sectionConfiguration/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'

type CustomSectionState = {}
type CustomSectionProps = {}

export const rootPane: TileBranchSubstance = {
  children: [
    { children: [makeBearerString('aaa')] },
    { onTab: 2, children: [makeBearerString('aaa'), makeBearerString('bbb'), makeBearerString('custom')] },
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
    const localRoot = localStorage.getItem('SomeOtherKeyxxx')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane

    return (
        <TileProvider
          rootNode={root}
          {...theme({ aaa: 'test1', bbb: 'test2', custom: 'test3' })}
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
  // localStorage.setItem('SomeOtherKeyxxx', JSON.stringify(getRootNode()))
  return <></>
}
