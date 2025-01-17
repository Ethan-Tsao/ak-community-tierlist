import React from 'react';
import Navbar from '../components/Navbar';

export default function TierUpdates() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Tier Updates</h1>
        <p className="text-gray-300">
          
        </p>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">January 16, 2025</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>The Arknights Community Tier List is born</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
