import React, { useEffect, useState } from 'react';

const tiers = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F'];
const classes = ['Vanguard', 'Guard', 'Defender', 'Sniper', 'Caster', 'Medic', 'Supporter', 'Specialist'];

export default function Home() {
  const [operators, setOperators] = useState([]);

  // Fetch operators from the API
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await fetch('/api/operators');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setOperators(data);
      } catch (error) {
        console.error('Error fetching operators:', error);
      }
    };

    fetchOperators();
  }, []);

  // Filter operators by tier and class
  const getOperatorsByTierAndClass = (tier: string, className: string) => {
    return operators.filter(
      (operator) => operator.tier === tier && operator.class.toLowerCase() === className.toLowerCase()
    );
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen w-[4300px] bg-gray-900 mx-auto">
      {/* Main Grid Container */}
      <div
        className="grid gap-4 " // Fixed grid width
        style={{
          gridTemplateColumns: '150px repeat(8, 500px)', // Thin tier column, fixed class columns
        }}
      >
        {/* Empty Top-Left Cell */}
        <div className="border border-gray-700"></div>

        {/* Class Headers */}
        {classes.map((className) => (
          <div
            key={`class-${className}`}
            className="text-center font-bold bg-gray-800 border border-gray-700 p-2"
          >
            {className}
          </div>
        ))}

        {/* Rows for Each Tier */}
        {tiers.map((tier) => (
          <React.Fragment key={`tier-${tier}`}>
            {/* Tier Label */}
            <div className="text-center font-bold bg-gray-800 border border-gray-700 p-2">{tier}</div>

            {/* Columns for Each Class */}
            {classes.map((className) => {
              const filteredOperators = getOperatorsByTierAndClass(tier, className);

              return (
                <div
                  key={`operator-card-column-${tier}-${className}`}
                  className="border border-gray-700 bg-gray-800 rounded-lg p-4"

                >
                  {filteredOperators.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {filteredOperators.map((operator) => (
                        <div key={operator.id} className="flex flex-col items-center mb-4">
                          {/* Operator Image */}
                          <img
                            src={`/avatars/${operator.img}.png` || 'https://via.placeholder.com/100'}
                            alt={operator.name}
                            className="w-16 h-16 rounded-full mb-2 border border-gray-600"
                          />
                          {/* Operator Name */}
                          <div className="text-center font-bold">{operator.name}</div>
                          {/* Vote Buttons */}
                          <div className="flex items-center mt-2">
                            <button className="w-8 bg-green-500 text-white px-2 py-1 rounded">+1</button>
                            <button className="w-8 bg-gray-300 text-black px-2 py-1 rounded">0</button>
                            <button className="w-8 bg-red-500 text-white px-2 py-1 rounded">-1</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
