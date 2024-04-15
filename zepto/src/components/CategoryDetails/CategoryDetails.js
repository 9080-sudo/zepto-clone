import React from 'react'
import classes from './CategoryDetails.module.css'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import { useFirebase } from '../../context/Firebase'
import Location from '../Location/Location'

export default function CategoryDetails() {
  const {showLocation} = useFirebase()
  return (
    <>
        <Header />
        {showLocation && <Location />}
        <Outlet />
    </>
  )
}
