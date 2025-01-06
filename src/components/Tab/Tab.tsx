"use client"

import React from 'react'

const Tab = ({
  id,
  className,
  children,
  idx,
  selected=false,
  disabled,
  onClick,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  idx?: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: ()=>void;
}) => {
  return (
    <div id={id || ''} className={'tab ' + className || ''} onClick={onClick} data-selected={selected ? "" : undefined} data-idx={idx} >
      {children}
    </div>
  )
}

export default Tab