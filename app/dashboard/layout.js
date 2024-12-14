import React from 'react'
import Sidebar from '../components/Sidebar'

function Layout({children}) {
  return (
    <div suppressHydrationWarning style={{height:"100%",display:"flex"}}>
      <Sidebar/>
      {children}
    </div>
  )
}

export default Layout