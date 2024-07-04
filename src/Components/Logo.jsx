import React from 'react'
import blog_logo from '../assets/blog_logo.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img  className='lg:w-20 md:w-16 sm:w-20'src={blog_logo} alt="" />
    </div>
  )
} 

export default Logo