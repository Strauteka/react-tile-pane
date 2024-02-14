import React from 'react'

function createStyles<T extends Record<string, React.CSSProperties>>(
  styles: T
): T {
  return styles
}

export const thickness = 2
export const stretchBarThickness = 0.25

export const color = {
  backL: '#1C242D',
  back: '#181E26',
  backD: '#12171D',
  secondary: '#567091',
  secondaryL: '#29394e',
  secondaryLL: 'rgba(41,57,78,0.3)',
  primary: '#60cbff',
}

export const size = createStyles({
  full: {
    height: '100%',
    width: '100%',
  },
})

export const flex = createStyles({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  around: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnBetween: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnRow: {
    flexDirection: 'row',
    display: 'flex',
  },
})

export const styles = createStyles({
  tabBar: {
    background: color.backL,
    ...size.full,
    ...flex.columnBetween,
  },
  tabAlign: {
    background: color.backL,
    ...size.full,
    ...flex.columnRow,
    // gap: '0.25rem',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  tabTitle: {
    color: '#ffffff',
    minHeight: thickness + 'em',
    minWidth: thickness + 'em',
    ...flex.between,
    background: color.secondaryLL,
    marginBottom: 0.375,
    cursor: 'grab',
    userSelect: 'none',
  },
  tabTitleOn: {
    color: '#ffffff',
    minHeight: thickness + 'em',
    minWidth: thickness + 'em',
    ...flex.between,
    background: color.secondaryL,
    marginBottom: 0.375,
    cursor: 'grab',
    userSelect: 'none',
  },
  pane: {
    background: color.back,
    ...size.full,
    ...flex.center,
  },
  closeButton: {
    // height: thickness + 'em',
    width: '1.2em',
    color: color.secondary,
    fontSize: 35,
    cursor: 'pointer',
    ...flex.center,
  },
})
