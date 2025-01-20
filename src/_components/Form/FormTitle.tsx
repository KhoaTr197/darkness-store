import React from 'react'

export type FormTitleProps = {
  id?: string,
  className?: string,
  children?: React.ReactNode
}

const FormTitle = ({
  id,
  className,
  children
}: FormTitleProps) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  )
}

export default FormTitle