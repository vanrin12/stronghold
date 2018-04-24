import * as React from 'react'

type Props = {
  onClick: Function
}

class RadioList extends React.Component<Props> {
  render() {
    const { title, data } = this.props;

    return (
      <div>
        <p className="mb--1">{title}</p>
        <ul>
          {
            data.map((radio, index) => {
              return (
                <li key={index}>
                  <div className="input-radio size-sm flex align-center">
                    <input id={radio.id} type="radio" checked={this.props.checked === radio.id} onChange={this.props.onChange} name={radio.text} value={radio.id}/>
                    <label htmlFor={radio.id} className="mr--1"></label>
                    <span className="input__label">{radio.text}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default RadioList
