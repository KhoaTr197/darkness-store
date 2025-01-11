import type { FormSubmit } from '@/_lib/types/component'
import { Button } from '@headlessui/react'
import React from 'react'

const FormSubmit = ({
  id,
  className,
  type,
  children
}: FormSubmit) => {
  return (
    <Button id={id} className={className} type={type}>
      {children}
    </Button>
  )
}

export default FormSubmit