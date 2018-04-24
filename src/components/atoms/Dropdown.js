// @flow
import * as React from 'react';

import onClickOutside from 'react-onclickoutside';

type Props = {
  title: React.Node,
  children: React.Node
}
type State = {
  visible: boolean
}

class Dropdown extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleClickOutside = () => {
    if (this.state.visible) {
      this.setState({
        visible: !this.state.visible
      })
    }
  };

  render() {
    return (
      <div className={'dropdown ' + (this.state.visible ? 'dropdown--active' : '')}>
        <span className="dropdown__trigger" onClick={ this.toggleVisible }>
          { this.props.title }
        </span>
        <div className="dropdown__container" onClick={ this.toggleVisible }>
          <div className="dropdown__content">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default onClickOutside(Dropdown);
