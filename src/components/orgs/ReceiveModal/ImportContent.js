// @flow
import * as React from "react"

import { validateAndResolveSeed as resolveSeed } from "../../../apis/addressValidation"

import type { RemoteStatusType } from "../../../types"
import { NOT_ASKED, LOADING, FAILURE } from "../../../types"

import ErrorBox from '../../atoms/ErrorBox'

import "./ImportContent.css"

type Props = {
  importWallet: Function,
  importingWallet: { status: RemoteStatusType },
  coinName: string
}

type State = {
  isValidSeed: null | boolean,
  stellarAddress: string,
  isImporting: boolean
}

class ImportContent extends React.Component<Props, State> {
  seed: ?HTMLInputElement

  state = {
    isValidSeed: null,
    stellarAddress: "",
    isImporting: false
  }

  canProceed = () => {
    return (this.state.isValidSeed === true && !this.isImporting())
  }

  isImporting = () => {
    const { status } = this.props.importingWallet
    return ((status === NOT_ASKED && this.state.isImporting) || status === LOADING)
  }

  handleChange = () => {
    if(this.seed && this.seed.value) {
      const seed = this.seed.value
      const result = resolveSeed(seed)

      this.setState({
        isValidSeed: result.isValid,
        stellarAddress: result.stellarAddress || ""
      })
    } else {
      this.setState({
        isValidSeed: null,  // back to default
        stellarAddress: ""
      })
    }
  }

  handleImport = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(this.seed && this.seed.value) {
      const seed = this.seed.value
      this.setState({
        isImporting: true
      }, ()=>{
        this.props.importWallet(seed)
      })
    }
  }

  render() {
    // Copy
    const inputPlaceholder = `Please enter your ${this.props.coinName} private key.`
    const importText = "By importing your private key, this will permanently merge your MOBI & XLM into your Stronghold wallet. This process will only work if your wallet holds XLM and MOBI with no other assets or trustlines."

    let statusMsg = null
    if (this.state.isValidSeed === false) {
      statusMsg = <span className="ImportContent__status-msg color--error">Your private key is invalid.</span>
    } else if(this.state.isValidSeed === true && this.state.stellarAddress) {
      statusMsg = <span className="ImportContent__status-msg color--success">{ this.state.stellarAddress }</span>
    }

    let errorMsg = null
    if (this.props.importingWallet.status === FAILURE) {
      errorMsg = (
        <ErrorBox>
          Unable to merge the account: <a href="https://stronghold.zendesk.com/hc/en-us" target="_blank" rel="noopener noreferrer">Get Help</a>
        </ErrorBox>
      )
    }

    let buttonText = "Import Private Key"
    if(this.isImporting()) {
      buttonText = "Importing Private Key..."
    }

    return (
      <div className="ImportContent">
        <form onSubmit={ this.handleImport }>
          { errorMsg }
          <input
            className="validate-required"
            type="text"
            name="import_address"
            placeholder={ inputPlaceholder }
            ref={ (el) => this.seed = el}
            onChange={ this.handleChange }
            disabled={ this.isImporting() }
            spellCheck="false"
          />
          { statusMsg }
          <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={ !this.canProceed() }
            >{ buttonText }</button>
          </div>
        </form>
        <p>{ importText }</p>
      </div>
    )
  }
}

export default ImportContent
