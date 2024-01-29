
const style = {
    minWidth: '100px',
    width: '100%',
    height: '100%',
  } as any

const x = (element: any) => {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        {element}
      </div>
    )
  }
export const functionalTest: React.FC = (props: {}) => {
  return x(
    <div style={style}>{'kiwifruit Simple FunctionalComponentTEst!'}</div>
  )
}
