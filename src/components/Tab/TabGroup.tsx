"use client"

import React from 'react'

export const TabSelectedContext = React.createContext({});

const TabGroup = ({
  id,
  className,
  defaultIndex=0,
  children,
}: {
  id?: string;
  className?: string;
  defaultIndex?: number;
  children: React.ReactNode;
}) => {

  const [tabSelected, setTabSelected] = React.useState(defaultIndex);

  return (
    <TabSelectedContext.Provider value={{tabSelected, setTabSelected}}>
      <div id={id || ''} className={"*:flex" + (className || '')}>
        {children}
      </div>
    </TabSelectedContext.Provider>
  )
}
export default TabGroup