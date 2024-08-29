import React from 'react'
import { Button, Navbar, NavbarCollapse, TextInput } from "flowbite-react";
import { Link , useLocation } from 'react-router-dom';
import {AiOutlineSearch } from 'react-icons/ai'
import {FaMoon } from 'react-icons/fa'


export default function HeaderSec() {
  const path =useLocation().pathname;
  return (
    <Navbar className='border-b-8 ' >
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-blue-400'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-red-500 rounded-lg text-white'>AniLink</span>
      🍕🍕
      </Link>
      <form>
      <TextInput
          type='text'
          placeholder='Search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'

      />
      </form>
      
      <Button className='w-12 h-10 lg:hidden self-center' color='gray' pill >
        <AiOutlineSearch />
      </Button>

      <NavbarCollapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to={'/'}>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/project'} as={'div'}>
            <Link to={'/project'}>Profile</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to={'/about'}>About</Link>
          </Navbar.Link>
      </NavbarCollapse >

      <div className="flex gap-2 mid:order-2">
        <button className='w-12 h-10 hidden sm:inline' > 
          <FaMoon color='gray' />
        </button>
        <Link to={'/sign-in'}>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign-In
          </Button>
        </Link>
        <Navbar.Toggle/>
      </div>

    </Navbar>
  )
}