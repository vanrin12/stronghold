// @flow

/* Modal we are using in our app
 *
 * currently wraps React-Modal.
*/

import * as React from 'react';
import AriaModal from 'react-aria-modal';

import './Modal.css';

type Props = {
  onRequestClose: Function,
  isOpen: boolean,
  contentLabel: string,
  modalTitle?: string | React.Element<*>,
  modalClassName?: string,
  children?: any,
  constrainWidth: boolean,
  initialInputFocus: boolean  // If should focus on first form input element
}

class Modal extends React.Component<Props> {
  static defaultProps = {
    constrainWidth: true,
    initialInputFocus: false
  };

  onAfterOpen = () => {
    // auto-focus
    const contents = document.getElementsByClassName('modal-content');
    if (contents && contents.length) {
      const content = contents[0];

      if (content && content.focus) {
        setTimeout(function() {
          content.focus();
        }, 300)
      }
    }
  };

  render() {
    let baseClassName = 'Modal__dialog boxed boxed--lg';

    if (this.props.constrainWidth) baseClassName += ' Modal__dialog--constrain';
    if (this.props.modalClassName) baseClassName += ' ' + this.props.modalClassName;

    let title = this.props.modalTitle ? <h3 className="Modal__dialog__title color--primary unpad">{ this.props.modalTitle }</h3> : null;

    return (
      <AriaModal
        titleText={this.props.contentLabel}
        onExit={this.props.onRequestClose}
        getApplicationNode={ getApplicationNode }
        mounted={this.props.isOpen}
        dialogClass={baseClassName}
        verticallyCenter={true}
        focusDialog={!this.props.initialInputFocus}
      >
        { title }
        { this.props.children }
      </AriaModal>
      /*
      <ReactModal
        {...this.props}
        overlayClassName={{
          base: 'modal-container',
          afterOpen: 'modal-active',
          beforeClose: 'modal-closing'
        }}
        className={{
          base: baseClassName,
          afterOpen: '',
          beforeClose: ''
        }}
        closeTimeoutMS={500}
        onAfterOpen={this.onAfterOpen}
      >
        <div className="Modal__box boxed boxed--border">
          { title }
          { this.props.children }
        </div>
      </ReactModal>
      */
    );
  }
}

export default Modal;

function getApplicationNode() {
  return document.getElementById('root');
}
