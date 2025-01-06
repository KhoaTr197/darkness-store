"use client"

import React from 'react'

const TabPanel = ({
  id,
  className,
  children,
  selected=false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  selected?: boolean
}) => {
  return (
    <div id={id || ''} className={(selected ? 'block ' : 'hidden ') + className || ''} data-selected={selected ? "" : undefined}>
      {children}
    </div>
  )
}

export default TabPanel