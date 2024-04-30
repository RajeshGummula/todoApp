import React from 'react'
const Navbar = () => {
  return (
    <div>
   <nav className="navbar bg-body-tertiary ">
  <div className="container-fluid">
    <a className="navbar-brand" href='/'>Todo</a>
    <div className='d-flex '>
    <a href="/" className='remover mx-2'>Home</a>
    <a href="/" className='remover'>Your Tasks</a>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar

