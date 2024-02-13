import { DragConfig, GestureHandlers } from '@use-gesture/react'
import React, {
  memo,
  useContext,
  useMemo,
  useRef,
  CSSProperties,
  useEffect,
} from 'react'
import useMeasure from 'react-use-measure'
import { LeafContext, SetTitleRectsContext } from '..'
import { PaneName, TileCharacteristic } from '../..'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'
import { PaneWithPreBox } from './typings'
import { orFn } from './util'

export type DraggableTitleProps = {
  name: PaneName
  characteristic?: TileCharacteristic
  children?: React.ReactNode | ((isMoving: boolean) => React.ReactNode)
  style?: CSSProperties | ((isMoving: boolean) => CSSProperties)
  className?: string | ((isMoving: boolean) => string)
  drag?: DragConfig
} & React.DOMAttributes<HTMLDivElement> &
  Partial<Pick<GestureHandlers, 'onDrag' | 'onDragEnd' | 'onDragStart'>>

const DraggableTitleInner: React.FC<DraggableTitleProps> = (props, aFn) => {
  const { name, drag, characteristic } = props
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const pane = useContext(LeafContext)
  const { position, bind, isDragging } = useDragAndPosition(
    paneWithPreBoxRef,
    name,
    pane,
    props,
    drag,
    characteristic
  )

  const { style, className, children, rest } = useFn(props, isDragging)

  const [targetRef, rect] = useMeasure({ scroll: true })
  const setTitleRects = useContext(SetTitleRectsContext)
  useEffect(() => {
    setTitleRects({ name: props.name, rect: { ...rect } })
  }, [props, rect, setTitleRects])

  const styled = useMemo(
    () =>
      (position
        ? {
            ...style,
            visibility: 'visible',
            position: 'fixed',
            left: position[0],
            top: position[1],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
            userSelect: 'none',
          }
        : style) as React.CSSProperties,
    [position, style]
  )
  return (
    <>
      {position && (
        <PreBox
          {...{
            paneWithPreBoxRef,
            position,
            characteristic: props.characteristic,
          }}
        />
      )}
      <div
        key={props.name}
        {...bind()}
        {...rest}
        ref={targetRef}
        style={{ ...styled, touchAction: 'none' }}
        className={className}
      >
        {children}
      </div>
    </>
  )
}

function useFn(
  {
    children: childrenFn,
    style: styleFn,
    className: classNameFn,
    ...rest
  }: DraggableTitleProps,
  isMoving: boolean
) {
  const style = useMemo(() => orFn(styleFn, isMoving), [isMoving, styleFn])
  const children = useMemo(
    () => orFn(childrenFn, isMoving),
    [childrenFn, isMoving]
  )
  const className = useMemo(
    () => orFn(classNameFn, isMoving),
    [classNameFn, isMoving]
  )
  return { style, children, className, rest }
}

export const DraggableTitle = memo(DraggableTitleInner)
export * from './typings'
export * from './hook/useMovingChecker'
