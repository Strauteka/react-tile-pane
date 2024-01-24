import {
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  TileProviderContext,
  useGetRootNode,
} from 'components'
import React from 'react'
import { styles, theme } from '../../demo/notDragable'
import { CustomSection2 } from './CustomSection2'
import { ContextProps, createTilePanes } from 'App/sectionConfiguration/section'
import { scroolStyle } from '../reactNodeSection/ReactNodeSection'

type CustomSectionState = {}
type CustomSectionProps = { tileProviderContext: TileProviderContext }

const body = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis dui et libero iaculis aliquet. Suspendisse ultrices nisi vel hendrerit pretium. Phasellus eu mi ornare, venenatis nisi id, fermentum diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec varius nisl et nunc faucibus, quis sagittis quam pulvinar. Fusce vel auctor dui. Donec vehicula cursus est, tempus condimentum lectus accumsan ac.

Vivamus bibendum ante feugiat blandit sollicitudin. Vivamus sit amet iaculis enim, eget congue libero. Pellentesque gravida suscipit sollicitudin. Fusce accumsan lectus ac efficitur iaculis. Mauris at luctus orci, sit amet viverra justo. Nam tortor massa, posuere ut malesuada et, suscipit ut lorem. Aliquam eget nisl orci. Integer imperdiet arcu a scelerisque varius. Maecenas molestie dapibus dictum. Aliquam dapibus ultricies velit, sit amet commodo velit finibus at.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris lacinia nisl id suscipit iaculis. Donec nec ornare odio. Nunc vehicula euismod urna. Phasellus vestibulum, neque non porta bibendum, odio nisl consequat ante, eu auctor nulla risus eu justo. Integer a hendrerit felis, nec ultrices quam. In placerat dignissim dignissim. Integer cursus aliquam lectus vitae tristique. Duis accumsan urna leo, sed laoreet diam posuere at. Praesent porttitor pharetra odio eu ultricies. Cras fringilla, mauris vitae imperdiet pulvinar, neque nulla sagittis arcu, ut scelerisque massa turpis eget erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Suspendisse rutrum eget purus non laoreet. Duis vitae quam vestibulum, congue neque fringilla, aliquam nisi. Pellentesque luctus facilisis tristique. Etiam aliquam augue sed aliquam rhoncus. Donec nisi eros, congue maximus ultrices sit amet, venenatis non nisl. Praesent libero nunc, luctus eget aliquam eu, scelerisque sed ipsum. Nulla scelerisque ex ut nibh malesuada, in interdum dui scelerisque. Etiam iaculis auctor odio, a suscipit urna dignissim id. Donec tincidunt justo quis mauris euismod finibus. Vivamus cursus eros ligula, eget condimentum nisl tempus ultricies. Duis auctor nunc sed lectus dapibus rhoncus.

Vivamus vestibulum ultrices arcu in vestibulum. Nunc porta bibendum risus, vitae bibendum felis lobortis id. In quis rhoncus orci. Nulla id ultricies purus. Cras ut nibh eget turpis rutrum interdum quis in elit. Proin mollis volutpat nisi id accumsan. Phasellus sodales nec tellus mollis commodo. Quisque sed sodales nunc. Proin vulputate risus varius aliquam posuere.`

const style = {
  //   minWidth: '200px',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'auto',
  boxSizing: 'content-box',
} as any

export const rootPane: TileBranchSubstance = {
  children: [{onTab: 2, children: ['aaa', 'bbb', 'kiwifruit'] }],
}

export class CustomSection extends React.Component<
  ContextProps<CustomSectionProps>,
  CustomSectionState
> {
  constructor(props: ContextProps<CustomSectionProps>) {
    super(props)
  }
  shouldComponentUpdate(
    nextProps: ContextProps<CustomSectionProps>,
    nextState: CustomSectionState
  ) {
    console.log('CustomSection shouldComponentUpdate', nextProps)
    return true
  }

  render = () => {
    const nodes = {
      aaa: (
        <div style={style}>
          <div style={{ width: '500px' }}>{'test1' + body}</div>
        </div>
      ),
      bbb: <div style={style}>{'test2' + body}</div>,
      kiwifruit: CustomSection2,
    }
    const nodeList = createTilePanes(nodes)
    const localRoot = localStorage.getItem('SomeOtherKeyxxx')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane
    return (
      <>
        <TileProvider
          tilePanes={nodeList}
          rootNode={root}
          {...theme({ aaa: 'test1', bbb: 'test2', kiwifruit: 'test3' })}
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
  const getRootNode = useGetRootNode()
  localStorage.setItem('SomeOtherKeyxxx', JSON.stringify(getRootNode()))
  return <></>
}
