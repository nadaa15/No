import React from 'react'
import NavbarComp from '../NavBar/NavbarComp'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
      <>
          <NavbarComp />
          <div className="container">
              <Outlet/>
          </div>
      </>
  )
}
