import React from 'react'
import { Children } from 'react'

const ShowToolTip = ({children,name}) => {
  return (
    <div className="tooltip tooltip-close tooltip-right z-20" data-tip={name}>
        <div >{children}</div>
    </div>
  )
}

export default ShowToolTip