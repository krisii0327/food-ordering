"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Hamburger from "@/components/icons/Hamburger";
import { useState } from "react";

export default function Header() {
  const session = useSession();

  const status = session?.status;
  const userData = session.data?.user;

  let userName = userData?.name || userData?.email;
  if(userName?.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  const image = userData?.image;

  const {cartProducts} = useContext(CartContext);
  const [mobileNav, setMobileNav] = useState(false);

  function AuthLinks({status, userName}) {
    if(status === 'authenticated') {
      return (
        <>
          <div className="md:flex gap-8">
            <div className="flex gap-2 items-center justify-center">
              <img src={image} className="rounded-full" width={40} height={40}></img>
              <Link href={'/profile'} className="whitespace-nowrap">Hello, {userName}</Link>
            </div>
            <button 
              href={'/logout'} 
              className="bg-primary rounded-full text-white px-8 py-2"
              onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </>
      )
    }
    if(status === 'unauthenticated') {
      return (
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
            Register
          </Link>
        </>
      )
    }
  }

  return (
    <>
      <header>
        <div className="flex md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            ST PIZZA
          </Link>
          <div className="flex gap-6 items-center">
            <Link href={'/cart'} className="relative">
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
              )}
            </Link>
            <button className="p-1 border" onClick={() => setMobileNav(prev => !prev)}>
              <Hamburger />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {mobileNav && (
            <div className="md:hidden max-w-xs p-2 pr-12 pl-12 bg-gray-100 rounded-lg mt-2 flex flex-col text-center items-center" onClick={() => setMobileNav(false)}>
              <Link href={'/'}>Home</Link>
              <Link href={'/menu'}>Menu</Link>
              <Link href={'/#about'}>About</Link>
              <Link href={'/#contact'}>Contact</Link>
              <AuthLinks status={status} userName={userName}/>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href={'/'}>
              ST PIZZA
            </Link>
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            <AuthLinks status={status} userName={userName}/>
            <Link href={'/cart'} className="relative">
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}