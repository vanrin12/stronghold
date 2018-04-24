// @flow

import * as React from "react"

import Modal from "../atoms/Modal"

import "./MultiPageModal.css"

type Props = {
  onRequestClose: Function,
  contentLabel: string,
  children: Array<any>,
  modalTitle?: string | React.Element<*>,
}

type State = {
  page: number
}

class MultiPageModal extends React.Component<Props, State> {
  state = {
    page: 0
  }

  handleNextClick = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault()

    const pageProps = this.currentPageProps()
    if(pageProps.onNextClick && !pageProps.onNextClick()) {
      // onNextClick can increment page count if it `return true`
      return
    }
    this.setState({ page:  ++this.state.page })

    /*  // showNextButton not being used...
    if(this.showNextButton()) {
      const pageProps = this.currentPageProps()
      if(pageProps.onNextClick && !pageProps.onNextClick()) {
        // onNextClick can increment page count if it `return true`
        return
      }
      this.setState({ page:  ++this.state.page })
    }
    */
  }
  handlePrevClick = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault()

    const pageProps = this.currentPageProps()
    pageProps.onPrevClick && pageProps.onPrevClick()

    if(this.showPrevButton()) {
      this.setState({ page:  --this.state.page })
    }
  }

  showPrevButton = () => {
    return !!this.state.page
  }

  /*
  showNextButton = () => {
    return this.state.page < (this.props.children.length - 1)
  }
  */

  currentPage = () => {
    return this.props.children[this.state.page]
  }
  currentPageProps = () => {
    const page = this.currentPage() || {}
    return page.props || {}
  }

  render() {
    const page = this.currentPage()
    const pageProps = this.currentPageProps()

    let prevButtonClass = "MultiPageModal__controls__button"
    let nextButtonClass = "MultiPageModal__controls__button"

    if(!this.showPrevButton()) {
      prevButtonClass += " MultiPageModal__controls__button--hidden"
    }

    /*  // currently always show next button
    if(!this.showNextButton()) {
      nextButtonClass += " MultiPageModal__controls__button--hidden"
    }
    */

    let nextButtonIsDisabled = false
    if(pageProps.canProceed && !pageProps.canProceed()) {
      nextButtonIsDisabled = true
    }

    return (
      <div className="MultiPageModal">
        <Modal
          contentLabel={ this.props.contentLabel }
          onRequestClose={ this.props.onRequestClose }
          isOpen={ true }
          modalTitle={ this.props.modalTitle }
        >
          <div className="MultiPageModal__wrapper container-fluid">
            <div className="MultiPageModal__content">
              { page }
            </div>
            <div className="MultiPageModal__controls">
              <a onClick={ this.handlePrevClick } className={"btn " + prevButtonClass}>
                <span className="btn__text">Prev</span>
              </a>
              <a
                onClick={ this.handleNextClick }
                className={"btn btn--primary " + nextButtonClass}
                disabled={ nextButtonIsDisabled }
              >
                <span className="btn__text">{ pageProps.nextButtonLabel || "Next" }</span>
              </a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default MultiPageModal
