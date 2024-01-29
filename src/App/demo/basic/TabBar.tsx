import { DraggableTitle, PaneName, TabBarPropsWithAction } from 'components'
import { unfoldBearer } from 'components/tilePane/view/Container/components/TilePanes/components/TilePane/Bearer'
import React from 'react'
import { color, flex, size, styles } from './styles'
import { named } from 'App/sectionConfiguration/named'

type TabBarState = { color: string }
export class TabBar extends React.Component<
  TabBarPropsWithAction ,
  TabBarState
> {
  private ref: React.RefObject<HTMLInputElement>
  constructor(props: TabBarPropsWithAction) {
    super(props)
    this.ref = React.createRef()
    this.state = { color: '#ffffff' }
  }

  shouldComponentUpdate(
    nextProps: TabBarPropsWithAction ,
    nextState: TabBarState
  ) {
    const element = this.ref.current
    // Things involving accessing DOM properties on element
    // In the case of what this question actually asks:
    if (element) {
      const hasOverflowingChildren = element.offsetWidth < element.scrollWidth
      if (hasOverflowingChildren) {
        nextState.color = color.primary 
      } else {
        nextState.color = '#ffffff'
      }
    }
    return true
  }

  tabBar = (tab: PaneName, i: number) => {
    const bearer = unfoldBearer(tab)
    return (
      <DraggableTitle
        style={{
          ...(i === this.props.onTab ? styles.tabTitleOn : styles.tabTitle),
          color: this.state.color,
          display: 'flex',
          flexDirection: 'column',
          minWidth: '80px',
        }}
        name={tab}
        key={tab}
        onClick={() => {
          console.log(
            'Tab switching from =>to',
            this.props.tabs[this.props.onTab],
            this.props.onTab,
            tab,
            i
          )
          this.props.action.switchTab(i)
        }}
      >
        <div style={{ ...flex.center, ...size.full }}>
          {named[bearer.paneName]?.tabTitle ?? '??????'}
        </div>
        <div
          style={{
            background:
              i === this.props.onTab ? color.primary : color.secondaryL,
            width: '100%',
            height: 6,
          }}
        />
      </DraggableTitle>
    )
  }

  render = () => {
    return (
      <>
        <div style={styles.tabBar}>
          <div ref={this.ref} style={styles.tabAlign}>
            {this.props.tabs.map(this.tabBar)}
          </div>
          {this.props.onTab !== -1 && (
            <div
              onClick={() => this.props.action.closeTab(this.props.onTab)}
              style={styles.closeButton}
            >
              ×
            </div>
          )}
        </div>
      </>
    )
  }
}
