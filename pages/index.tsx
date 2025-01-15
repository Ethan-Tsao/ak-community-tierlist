import React from 'react';

const tiers = ['S', 'A', 'B', 'C', 'F'];
const classes = ['Sniper', 'Guard', 'Defender', 'Medic', 'Supporter', 'Caster', 'Specialist', 'Vanguard'];

export default function Home() {
  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Grid Container */}
      <div className="grid grid-cols-9 auto-rows-min gap-2 border border-gray-700">
        {/* Empty top-left corner */}
        <div className="border border-gray-700"></div>

        {/* Class Headers */}
        {classes.map((className) => (
          <div key={`class-${className}`} className="text-center font-bold bg-gray-800 border border-gray-700 p-2">
            {className}
          </div>
        ))}

        {/* Tier Rows */}
        {tiers.map((tier) => (
          <React.Fragment key={`tier-${tier}`}>
            {/* Tier Label */}
            <div className="text-center font-bold bg-gray-800 border border-gray-700 p-2">
              {tier}
            </div>

            {/* Operator Cards for Each Class */}
            {classes.map((className) => (
              <div
                key={`operator-card-${tier}-${className}`}
                className="border border-gray-700 bg-gray-800 rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src="https://via.placeholder.com/100"
                  alt="Operator"
                  className="w-16 h-16 rounded-full mb-2 border border-gray-600"
                />
                <div className="text-center font-bold">Operator</div>
                <div className="flex justify-around mt-2 w-full">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">+1</button>
                  <button className="bg-gray-300 text-black px-2 py-1 rounded">Neutral</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">-1</button>
                </div>
              </div>
              
              
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
