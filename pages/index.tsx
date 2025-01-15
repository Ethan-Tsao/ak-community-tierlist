import React, { useEffect, useState } from 'react';

const tiers = ['S+','S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F'];
const classes = ['Sniper', 'Guard', 'Defender', 'Medic', 'Supporter', 'Caster', 'Specialist', 'Vanguard'];

export default function Home() {
    console.log('Home component rendered'); // Log when the component renders

  const [operators, setOperators] = useState([]);

  // Fetch operators from the API
  useEffect(() => {
    console.log('useEffect triggered'); // Log when useEffect is triggered
  
    const fetchOperators = async () => {
      try {
        console.log('Fetching operators...'); // Log before fetch
        const response = await fetch('/api/operators');
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Fetched operators:', data); // Log fetched data
        setOperators(data);
      } catch (error) {
        console.error('Error fetching operators:', error); // Log errors
      }
    };
  
    fetchOperators();
  }, []);

  // Helper function to filter operators by tier and class
  const getOperatorsByTierAndClass = (tier: string, className: string) => {
    const filtered = operators.filter(
      (operator) => operator.tier === tier && operator.class === className.toLowerCase()
    );
    console.log(`Filtered Operators for Tier ${tier} and Class ${className}:`, filtered);
    return filtered;
  };
  

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="grid grid-cols-9 auto-rows-min gap-2 border border-gray-700">
        <div className="border border-gray-700"></div>
        {classes.map((className) => (
          <div key={`class-${className}`} className="text-center font-bold bg-gray-800 border border-gray-700 p-2">
            {className}
          </div>
        ))}

        {tiers.map((tier) => (
          <React.Fragment key={`tier-${tier}`}>
            <div className="text-center font-bold bg-gray-800 border border-gray-700 p-2">
              {tier}
            </div>
            {classes.map((className) => {
              const filteredOperators = getOperatorsByTierAndClass(tier, className);
              return (
                <div key={`operator-card-${tier}-${className}`} className="border border-gray-700 bg-gray-800 rounded-lg p-4">
                  {filteredOperators.length > 0 ? (
                    filteredOperators.map((operator) => (
                      <div key={operator.id} className="mb-4">
                        <img
                          src="https://via.placeholder.com/100"
                          alt={operator.name}
                          className="w-16 h-16 rounded-full mb-2 border border-gray-600"
                        />
                        <div className="text-center font-bold">{operator.name}</div>
                        <div className="flex justify-around mt-2 w-full">
                          <button className="bg-green-500 text-white px-2 py-1 rounded">+1</button>
                          <button className="bg-gray-300 text-black px-2 py-1 rounded">Neutral</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded">-1</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">No Operators</div>
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
