import React from 'react'
import style from "./Loader.module.css"

const Loader = ({theme}) => {
  return (
    <span className={`${style.loader}`}></span>
  )
}

export default Loader