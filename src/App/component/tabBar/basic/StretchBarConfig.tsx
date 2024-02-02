import { StretchBarConfig } from 'components'
import { CSSProperties } from 'react'
import './styles.css'
export const StretchBar: StretchBarConfig = {
  className: 'left-stretch-bar',
  style: (isRow: boolean) =>
    ({ cursor: isRow ? 'ew-resize' : 'ns-resize' } as CSSProperties),
  position: 'previous',
}
