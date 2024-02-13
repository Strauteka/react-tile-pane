import { DraggableTitle, PaneName, TabBarPropsWithAction } from 'components'
import React, { CSSProperties } from 'react'
import { color, flex, size, styles } from './styles'
import { unfoldBearer } from '../../../sectionConfiguration/Bearer'
import { SectionConfiguration } from 'App/sectionConfiguration/SectionConfiguration'
type TabBarState = { color: string }

export type CustomTabBarProps = {
  named: { [name: string]: SectionConfiguration }
  isDraggable?: boolean
  noBar?: boolean
}

type TabBarProps = TabBarPropsWithAction &
  CustomTabBarProps & {
    moving: string[]
  }

export class TabBar extends React.Component<TabBarProps, TabBarState> {
  private ref: React.RefObject<HTMLInputElement>
  constructor(props: TabBarProps) {
    super(props)
    this.ref = React.createRef()
    this.state = { color: '#ffffff' }
  }

  shouldComponentUpdate(nextProps: TabBarProps, nextState: TabBarState) {
    const element = this.ref.current
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

  content = (tab: PaneName, i: number) => {
    const bearer = unfoldBearer(tab)
    return (
      <div style={{ ...flex.center, ...size.full, margin: '0.5em' }}>
        {this.props.named[bearer.paneName]?.tabTitle ?? 'no-title'}
      </div>
    )
  }

  tabBar = (tab: PaneName, i: number) => {
    const bearer = unfoldBearer(tab)
    const tagProps = {
      key: tab,
      style: {
        ...(i === this.props.onTab ? styles.tabTitleOn : styles.tabTitle),
        color: this.state.color,
        ...(this.props.isDraggable ? {} : { cursor: 'pointer' }),
      } as CSSProperties,
      onClick: () => {
        console.log(
          'Tab switching from =>to',
          this.props.tabs[this.props.onTab],
          this.props.onTab,
          tab,
          i
        )
        this.props.action.switchTab(i)
      },
    }
    return this.props.isDraggable ? (
      <DraggableTitle
        name={tab}
        drag={{ filterTaps: true, tapsThreshold: 10 }}
        characteristic={this.props.named[bearer.paneName]?.characteristic}
        {...tagProps}
      >
        {this.content(tab, i)}
      </DraggableTitle>
    ) : (
      <div {...tagProps}>{this.content(tab, i)}</div>
    )
  }

  render = () => {
    const tabBars = this.props.tabs.map(this.tabBar)
    return (
      !!!this.props.noBar && (
        <div style={styles.tabBar}>
          <div ref={this.ref} style={{...styles.tabAlign, margin: '0.25em'}}>
            {tabBars}
          </div>
          {this.props.onTab !== -1 && (this.props.isDraggable || false) && (
            <div
              onClick={() => this.props.action.closeTab(this.props.onTab)}
              style={styles.closeButton}
            >
              ×
            </div>
          )}
        </div>
      )
    )
  }
}
