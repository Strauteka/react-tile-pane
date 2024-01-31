import {
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  TileProviderContext,
} from 'components'
import React from 'react'
import { theme } from '../../demo/custom'
import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { PaneProvider } from 'App/sectionConfiguration/paneProvider'
type CustomSection2State = { result: string }
type CustomSection2Props = {
  tileProviderContext: TileProviderContext
}

export const rootPane: TileBranchSubstance = {
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

export class CustomSection2 extends React.Component<
  SectionContext<CustomSection2Props>,
  CustomSection2State
> {
  constructor(props: SectionContext<CustomSection2Props>) {
    super(props)
    this.state = { result: 'initial stuff!' }
    console.log('CONSTRUCTOR!!!!! CustomSection2Props')
  }

  render = () => {
    const localRoot = localStorage.getItem('SomeOtherKey1')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane

    return (
      <>
        <TileProvider
          rootNode={root}
          {...theme({
            SubSection1: 'SubSection1',
            SubSection2: 'SubSection2',
            SubSection3: 'SubSection3',
          })}
          tilePaneProvider={{ paneProvider: PaneProvider }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}
          >
            <TileContainer
              context={this.props.context}
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
  // localStorage.setItem('SomeOtherKey1', JSON.stringify(getRootNode()))
  return <></>
}
