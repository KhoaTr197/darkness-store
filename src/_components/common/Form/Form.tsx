import React from 'react'
import type { Form } from '@/_lib/types/component'

const Form = ({
  id,
  className,
  children,
  onSubmit,
}: Form) => {
  return (
    <form id={id} className={className} onSubmit={onSubmit} method="post">
      {children}
    </form>
  )
}

export default Form