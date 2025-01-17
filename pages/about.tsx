import React from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="text-gray-300 mb-6">
          This tier list project is a community-driven effort to evaluate and rank operators in the game <strong>Arknights</strong>. 
          The system allows users to vote for operators to move tiers, ensuring a fair and democratic way to determine rankings. 
          Except when I don&apos;t like your operator then I can tank their tier. So really it&apos;s just like real life!
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">Acknowledgments</h2>
        <p className="text-gray-300">
          Special thanks to you! This wouldn&apos;t exactly work without the help of the community. Also <a href="https://github.com/neeia" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Neeia</a> for publicly providing Arknights assets.
          *Psst* she is also the founder of <a href="https://www.krooster.com/" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Krooster</a> and a developer for <a href="https://sanitygone.help/operators" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Sanity;Gone</a>
        </p>
      </div>
    </div>
  );
}
