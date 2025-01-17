import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg w-screen mb-8 rounded-md">
      <div className="flex justify-start items-end">
        <Image src='/avatars/neoicebear.png'
                              alt='das me!'
                              width={80}
                              height={80}/>
        {/* Logo or Title */}
        <h1 className="text-3xl font-bold pl-2 pr-8">Arknights Community Tier List</h1>

        {/* Navigation Links */}
        <div className="flex space-x-4 items-end">
          <Link href="/" className="text-xl font-bold hover:bg-gray-700 px-3 rounded-md">
            <h1>Home</h1>
          </Link>
          <Link href="/tier-updates" className="text-xl font-bold hover:bg-gray-700 px-3 rounded-md">
            <h1>Tier Updates</h1>
          </Link>
          <Link href="/about" className="text-xl font-bold hover:bg-gray-700 px-3 rounded-md">
            <h1>About</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
}


