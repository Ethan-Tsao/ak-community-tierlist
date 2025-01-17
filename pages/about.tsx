import React from 'react';
import Navbar from '../components/Navbar';
import { FaDiscord, FaYoutube } from "react-icons/fa6";
import Link from 'next/link';
import Flex from 'next';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="text-gray-300 mb-6">
          This Arknights community tier list was born from the death of the Arknights gamepress and the other poopoo tier lists people produced in the aftermath. I created a preliminary tier list 
          that I think is intentionally inaccurate to demonstrate actual movement and see if this idea would actually work. The UI is ugly and it&apos;s all kinds of jank but it was created in 2 days 
          and is still a work in progress. If you have suggestions or just wanna send me hate mail, my youtube and discord are right here.
        </p>
        <div className="text-4xl flex">
          <FaDiscord/> 
          <h1 className="text-2xl pl-2">neoicebear</h1>
        </div>
        <Link href="https://www.youtube.com/@neoicebear3826" className="text-4xl flex">
          <FaYoutube/> 
          <p className="text-2xl pl-2">Youtube</p>
        </Link>

        <h2 className="text-2xl font-bold mt-6 mb-3">Acknowledgments</h2>
        <p className="text-gray-300">
          Special thanks to you! This wouldn&apos;t exactly work without the help of the community. Also <a href="https://github.com/neeia" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Neeia</a> for publicly providing Arknights assets.
          *Psst* she is also the founder of <a href="https://www.krooster.com/" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Krooster</a> and a developer for <a href="https://sanitygone.help/operators" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Sanity;Gone</a>
        </p>
      </div>
    </div>
  );
}

