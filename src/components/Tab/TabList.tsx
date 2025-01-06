"use client"

import React from 'react'
import { TabSelectedContext } from './TabGroup';

const TabList = ({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: React.ReactNode
}) => {

  const {tabSelected, setTabSelected} = React.useContext<any>(TabSelectedContext)
  
  const handleClick = (e: Event) => {
    if(!e.target) return;

    const targetElement = e.target as NonNullable<HTMLElement>; 
    const parent = targetElement.parentElement as HTMLElement;
    const siblings = parent.querySelectorAll('div');

    for (const sibling of siblings) {
      sibling.removeAttribute('data-selected')
    }
    targetElement.dataset.selected = true.toString();

    setTabSelected(targetElement.dataset.idx)
  }

  return (
    <div id={id || ''} className={className || ''}>
      {
      React.Children.map(children, (child, idx) => {
        const props = { idx: idx, selected: false, onClick: handleClick }

        if(idx == tabSelected)
          props.selected = true;

        return React.cloneElement(child as React.JSX.Element, props);
      })
      }
    </div>
  )
}

export default TabList