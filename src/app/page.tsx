"use client"; // Ensures it runs only on the client

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";


export default function LoginPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Fix: Only access localStorage in useEffect (client-side)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  if (!hasMounted) return null; // Prevents hydration mismatch

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="bgc absolute top-[100px] left-[22px] w-[90%] h-[200px] md:w-[1235px] md:h-[433px] rounded-[20px] md:rounded-[43px] overflow-hidden shadow-lg">
        <Image 
          src="/image/pexels-darina-belonogova-8788682.svg" 
          alt="Background" 
          layout="fill"
          priority
          style={{ objectFit: "cover" }} 
          className="w-full h-full"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between p-4 bg-white shadow-md fixed top-0 z-50">
        <a className="text-xl font-bold nav-left" href="#">IT</a>

        {/* Centered Location */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span>
            <Image src="/icons/location-pin-svgrepo-com1.svg" alt="location" width={15} height={15} className="inline" /> 
            Abuja
          </span>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center space-x-8 relative nav-right">
          <a href="#" className="text-gray-600">Store</a>
          <a href="#" className="text-red-500 relative">Login
            <span className="absolute left-0 w-full h-[2px] bg-red-500 top-[45px]"></span>
          </a>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg shopper-btn">Become a Shopper</button>
        </div>

        {/* Mobile Right Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <div className="user-circle">
            <Image src="/icons/user-circle-svgrepo-com1.svg" alt="User" width={30} height={30} />
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image src="/icons/MenuAlt3Outline.svg" alt="Menu" width={30} height={30} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 w-[250px] h-full bg-white shadow-md transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300 md:hidden`}>
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            <Image src="/icons/close-svgrepo-com.svg" alt="Close" width={20} height={20} />
          </button>
          <div className="flex flex-col items-center mt-16 space-y-6">
            <a href="#" className="text-gray-600">Store</a>
            <a href="#" className="text-red-500 border-b-2 border-red-500 pb-1">Login</a>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg shopper-btn">Become a Shopper</button>
          </div>
        </div>
      </nav>

      <div className="intro-mobile">Welcome back</div>

      {/* Desktop Main Content */}
      <div className="relative flex items-start justify-start dmc">
        {/* Login Card */}
        <div className="bg-white shadow-lg rounded-[25px] p-6 w-[380px] h-[316px] fullContain">
          <div className="inner-container">
            {!isManual ? (
              <>
                <div className="content-wrapper">
                  <div className="call-to-action">
                    <h2 className="text-lg font-semibold font-[sans-serif]">Welcome back</h2>
                  </div>
                  <p className="text-sm text-gray-500 m-lg">Login using:</p><br />
                  <button className="flex items-center justify-center w-full mt-4 border p-2 rounded-lg-btn-google shadow-md">
                    <Image src="/icons/google-logo-search-new-svgrepo-com1.svg" alt="Google" width="26" height="26" />
                    <span className="ml-2">Login with Google</span>
                  </button>
                  <p className="mt-4 text-sm text-gray-500 cursor-pointer flex items-left justify-left" onClick={() => setIsManual(true)}>
                    <span className="inline-block">
                      <Image src="/icons/switch-horizontal-svgrepo-com1.svg" alt="Switch" width="20" height="20" />
                    </span> 
                    <span>Click to switch to manual</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold font-[sans-serif]">Log in</h2>
                <div className="login-content">
                  <input type="email" placeholder="name@email.com" className="w-[100%] mt-2 p-2 border rounded-md login-content-input" />
                  <input type="password" placeholder="please enter password" className="w-[100%] mt-2 p-2 border rounded-md login-content-input" />
                  <p className="text-sm text-gray-500 mt-1 cursor-pointer">Forgot Password?</p>
                </div>
                <button className="w-[40%] bg-black text-white p-2 mt-4 rounded-lg proceed-btn">Proceed</button>
                <p className="mt-4 text-sm text-gray-500 cursor-pointer flex items-left justify-left" onClick={() => setIsManual(false)}>
                  <span className="inline-block">
                    <Image src="/icons/switch-horizontal-svgrepo-com1.svg" alt="Switch" width="20" height="20" />
                  </span> 
                  <span>Tap to login with Google</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
