import React from 'react'

type DataRow = {}

type EditFormDefaultState<D> = {
  editData?: {
    [name: string]: DataRow
  }
}

type EditFormDefaultProps<D> = {
  editData?: { [name: string]: DataRow }
  onSave: (oldData: any, newData: any) => void
  getEditState: () => { getState?: () => { oldData: any; newData: any } }
}

export class EditFormDefault<D> extends React.Component<
  EditFormDefaultProps<D>,
  EditFormDefaultState<D>
> {
  constructor(props: EditFormDefaultProps<D>) {
    super(props)
    this.state = { editData: props.editData }
  }

  getState = () => {
    return { oldData: this.props.editData, newData: this.state.editData }
  }

  componentDidMount(): void {
    console.log('component upd',   this.props.getEditState())
    this.props.getEditState().getState = this.getState
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editData: {
        ...this.state.editData,
        [event.target.name]: event.target.value,
      },
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.onSave(this.props.editData, this.state.editData)
    event.preventDefault()
  }

  render = () => {
    const fields = Object.entries(this.state.editData || {}).map(
      (entry, idx) => {
        return (
          <div key={idx}>
            <label>
              {entry[0]}
              {': '}
              <input
                name={entry[0]}
                type="text"
                value={entry[1] as string}
                onChange={this.handleChange}
              />
            </label>
          </div>
        )
      }
    )
    return (
      <form onSubmit={this.handleSubmit}>
        {fields}

        <input type="submit" value="Submit" />
      </form>
    )
  }
}
