export const scroolStyle = {
  minWidth: '100px',
  minHeight: '100px',
  width: 'calc(100% - 20px)',
  height: 'calc(100% - 20px)',
  overflow: 'auto',
  // paddingRight: '17px',
  boxSizing: 'content-box',

  padding: '10px 10px 10px 10px'
} as any

const x = (element: any) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {element}
    </div>
  )
}

const body = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Primum in nostrane potestate est, quid meminerimus? Causa autem fuit huc veniendi ut quosdam hinc libros promerem. At iam decimum annum in spelunca iacet. Illa videamus, quae a te de amicitia dicta sunt. Bork Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; Et ille ridens: Video, inquit, quid agas; <a href="http://loripsum.net/" target="_blank">Duo Reges: constructio interrete.</a> </p>

<p>Sed plane dicit quod intellegit. Claudii libidini, qui tum erat summo ne imperio, dederetur. Traditur, inquit, ab Epicuro ratio neglegendi doloris. In qua quid est boni praeter summam voluptatem, et eam sempiternam? At iam decimum annum in spelunca iacet. <b>Quae cum dixisset paulumque institisset, Quid est?</b> </p>

<p>An est aliquid, quod te sua sponte delectet? Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Quod ea non occurrentia fingunt, vincunt Aristonem; Quid, si etiam iucunda memoria est praeteritorum malorum? Ille vero, si insipiens-quo certe, quoniam tyrannus -, numquam beatus; Nam aliquando posse recte fieri dicunt nulla expectata nec quaesita voluptate. Quid est igitur, inquit, quod requiras? </p>

`

export const pineapple = x(<div style={scroolStyle}>{'pineapple' + body}</div>)
export const lemon = x(<div style={scroolStyle}>{'lemon' + body}</div>)
export const grape = x(<div style={scroolStyle}>{'grape' + body}</div>)
