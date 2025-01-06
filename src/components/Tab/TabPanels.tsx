"use client"

import React from 'react'
import { TabSelectedContext } from './TabGroup'

const TabPanels = ({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: React.ReactNode
}) => {

  const {tabSelected, setTabSelected} = React.useContext<any>(TabSelectedContext)
  return (
    <div id={id || ''} className={className || ''}>
      {
        React.Children.map(children, (child, idx)  => {
          const props = { idx: idx, selected: false }

          if (idx == tabSelected)
            props.selected = true;

          return React.cloneElement(child as React.JSX.Element, props);
        })
      }
    </div>
  )
}

export default TabPanels