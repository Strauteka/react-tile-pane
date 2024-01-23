import { increasingID, isTileLeaf, PaneName } from '../..'
import {
  TileBranchSubstance,
  TileLeafSubstance,
  TileNodeConstructor,
  TileNodeRect,
} from './typings'

export function calcChildGrows(children: { grow?: number }[]) {
  const growsSolid = children.map((c) => c.grow ?? 1)
  const growSum = growsSolid.reduce((s, n) => (s += n), 0) // 部分值
  const grows = growsSolid.map((c) => c / growSum) // 相对值
  return grows
}

export function calcChildRects(
  parent: TileBranch,
  grows: number[]
): TileNodeRect[] {
  const { isRow, rect } = parent
  const { top, left, width, height } = rect
  if (isRow) {
    const childLeft = grows.reduce<number[]>(
      (arr, n, i) => {
        // 计算子元素 left
        if (i > 0) arr.push(arr[i - 1] + width * grows[i - 1])
        return arr
      },
      [left]
    )
    return grows.map((n, i) => ({
      top,
      height,
      width: n * width,
      left: childLeft[i],
    }))
  } else {
    const childTop = grows.reduce<number[]>(
      (arr, n, i) => {
        // 计算子元素 top
        if (i > 0) arr.push(arr[i - 1] + height * grows[i - 1])
        return arr
      },
      [top]
    )
    return grows.map((n, i) => ({
      left,
      width,
      height: n * height,
      top: childTop[i],
    }))
  }
}


export interface TileNode {
     readonly id: string;
     readonly parent: TileBranch | null;
     grow: number;
     rect: TileNodeRect;
}

export class TileNode {
  constructor(
    public readonly id: string = increasingID(),
    public readonly parent: TileBranch | null = null,
    public grow: number = 1,
    public rect: TileNodeRect = {
      top: 0,
      left: 0,
      width: 1,
      height: 1,
    }
  ) {}
}

export class TileLeaf extends TileNode {
  constructor(
    public onTab: number = 0,
    public children: PaneName[] = [],
    ...rest: TileNodeConstructor
  ) {
    super(...rest)
  }
  public setChildren(children: PaneName[]) {
    this.children = children.filter(
      (child, i) => children.findIndex((it) => it === child) === i
    )
  }

  public dehydrate = (): TileLeafSubstance => {
    this.children
    return {
      id: this.id,
      onTab: this.onTab,
      children: this.children,
      grow: this.grow,
    }
  }
}

export class TileBranch extends TileNode {
  public children!: (TileBranch | TileLeaf)[]
  constructor(
    public isRow: boolean = false,
    children: (TileBranchSubstance | TileLeafSubstance)[],
    ...rest: TileNodeConstructor
  ) {
    super(...rest)
    this.setChildren(children)
  }

  public setChildren(
    children: (TileBranchSubstance | TileLeafSubstance)[]
  ) {
    const grows = calcChildGrows(children)
    const rect = calcChildRects(this, grows)
    this.children = children
      .filter((child, i) => children.findIndex((it) => it === child) === i)
      .map((it, i) =>
        isTileLeaf(it)
          ? new TileLeaf(
              it.onTab,
              it.children instanceof Array ? it.children : [it.children],
              it.id,
              this,
              grows[i],
              rect[i]
            )
          : new TileBranch(it.isRow, it.children, it.id, this, grows[i], rect[i])
      )
  }
  
  public dehydrate(): TileBranchSubstance {
    const childrenDehydrated = this.children.map((it) =>
      isTileLeaf(it) ? it.dehydrate() : it.dehydrate()
    )

    return {
      id: this.id,
      children: childrenDehydrated,
      isRow: this.isRow,
      grow: this.grow,
    }
  }
}

export * from './typings'
export * from './helper'
