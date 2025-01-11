import type { FormTitle } from '@/_lib/types/component'
import React from 'react'

const FormTitle = ({
  id,
  className,
  children
}: FormTitle) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  )
}

export default FormTitle