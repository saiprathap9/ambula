import React from 'react'
import { Link } from 'react-router-dom'
import"./header.css"

function Header() {
  return (
    <>
    <section>
        <nav>
            <ul className='navbar'>
                <li className='ppp'>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    </section>
    </>
  )
}

export default Header