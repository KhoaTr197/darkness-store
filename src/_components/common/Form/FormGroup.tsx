import type { FormGroup } from '@/_lib/types/component'
import React from 'react'

const FormGroup = ({
  id,
  className,
  children
}: FormGroup) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  )
}

export default FormGroup