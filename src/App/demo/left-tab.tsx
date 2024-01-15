import React from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  useGetRootNode,
  TileBranchSubstance,
  createTilePanes,
} from 'components'
import { color, styles, theme } from 'theme/left-tab'
import 'theme/left-tab/styles.css'

const localStorageKey = 'react-tile-pane-left-tab-layout'
const body = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Primum in nostrane potestate est, quid meminerimus? Causa autem fuit huc veniendi ut quosdam hinc libros promerem. At iam decimum annum in spelunca iacet. Illa videamus, quae a te de amicitia dicta sunt. Bork Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; Et ille ridens: Video, inquit, quid agas; <a href="http://loripsum.net/" target="_blank">Duo Reges: constructio interrete.</a> </p>

<p>Sed plane dicit quod intellegit. Claudii libidini, qui tum erat summo ne imperio, dederetur. Traditur, inquit, ab Epicuro ratio neglegendi doloris. In qua quid est boni praeter summam voluptatem, et eam sempiternam? At iam decimum annum in spelunca iacet. <b>Quae cum dixisset paulumque institisset, Quid est?</b> </p>

<p>An est aliquid, quod te sua sponte delectet? Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Quod ea non occurrentia fingunt, vincunt Aristonem; Quid, si etiam iucunda memoria est praeteritorum malorum? Ille vero, si insipiens-quo certe, quoniam tyrannus -, numquam beatus; Nam aliquando posse recte fieri dicunt nulla expectata nec quaesita voluptate. Quid est igitur, inquit, quod requiras? </p>

`
const style = {
  minWidth: '100px',
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  paddingRight: '17px',
  boxSizing: 'content-box',
} as any

const x = (element: any) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {element}
    </div>
  )
}
const nodes = {
  pineapple: x(<div style={style}>{'pineapple' + body}</div>),
  SomeGoodSection: x(<div style={style}>{'SomeGoodSection' + body}</div>),
  lemon: x(<div style={style}>{'lemon' + body}</div>),
  grape: x(<div style={style}>{'grape' + body}</div>),
  kiwifruit: x(<div style={style}>{'kiwifruit' + body}</div>),
}

export type nodeNames = keyof typeof nodes

export const icons: Record<nodeNames, string> = {
  SomeGoodSection: 'SomeGoodSection',
  pineapple: '🍍',
  lemon: '🍋',
  grape: '🍇',
  kiwifruit: '🥝',
}

export const [nodeList, names] = createTilePanes(nodes)

export const rootPane: TileBranchSubstance = {
  // children: [
  //   { children: [] },
  // ],
  children: [
    { children: [names.SomeGoodSection, names.pineapple] },
    {
      isRow: true,
      grow: 2,
      children: [
        {
          isRow: true,
          children: [
            { children: [names.lemon, names.grape], grow: 3 },
            { children: names.kiwifruit },
          ],
        },
      ],
    },
  ],
}

function PaneIcon({ name }: { name: keyof typeof icons }) {
  const getLeaf = useGetLeaf()
  const move = useMovePane()
  const leaf = getLeaf(name)
  const isShowing = !!leaf
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: 60,
        background: color.backL,
        fontSize: 25,
        padding: 10,
        color: '#ffffff',
        gap: '1rem',
      }}
    >
      <div style={{ cursor: 'move' }}>
        <DraggableTitle name={name}>{icons[name]}</DraggableTitle>
      </div>
      <div
        onClick={() => move(name, isShowing ? null : [0, 0])}
        style={{
          cursor: 'pointer',
          background: isShowing ? color.primary : color.secondary,
          width: 14,
          height: 14,
          borderRadius: 99,
        }}
      />
    </div>
  )
}

export const LeftTabDemo: React.FC = () => {
  console.log('rebuild view')
  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane
  return (
    <TileProvider tilePanes={nodeList} rootNode={root} {...theme(icons)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: color.backL,
          }}
        >
          {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
            <PaneIcon key={name} {...{ name }} />
          ))}
        </div>

        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <TileContainer style={styles.container} />
        </div>
      </div>
      <AutoSaveLayout />
      <div />
    </TileProvider>
  )
}

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}
