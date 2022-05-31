import React, { memo, useEffect } from 'react'

const O2O = () => {
  useEffect(() => {
    console.log('I am re-render 020')
  })
  return (
    <div>
      <input placeholder="press here" />
    </div>
  )
}

export const OOOOOOOOO = memo(() => {
  useEffect(() => {
    console.log('I am re-render')
  })
  return (
    <div>
      <O2O />
    </div>
  )
})
