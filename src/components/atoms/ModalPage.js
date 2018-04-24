// @flow

import * as React from "react"

type Props = {
  children?: any,
  canProceed?: Function,
  nextButtonLabel?: string,
  onNextClick?: Function
}

export default function Page(props: Props) {
  return (
    <div className="MultiPageModal__ModalPage">
      { props.children }
    </div>
  )
}
