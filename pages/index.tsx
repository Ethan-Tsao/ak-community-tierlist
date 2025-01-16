import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';

type Operator = {
  id: string;
  name: string;
  class: string;
  rarity: number;
  tier: string;
  img: string;
  voteCounts: {
    UPVOTE: number;
    NEUTRAL: number;
    DOWNVOTE: number;
  };
};

const prisma = new PrismaClient();

const tiers = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F'] as const;
const classes = ['Vanguard', 'Guard', 'Defender', 'Sniper', 'Caster', 'Medic', 'Supporter', 'Specialist'] as const;

// Fetch data at build time and enable revalidation
export async function getStaticProps() {
  const operators = await prisma.operator.findMany({
    include: {
      votes: true, // Include vote data
    },
  });

  const operatorsWithVoteCounts = operators.map((operator) => {
    const voteCounts = { UPVOTE: 0, NEUTRAL: 0, DOWNVOTE: 0 };

    operator.votes.forEach((vote) => {
      voteCounts[vote.voteType]++;
    });

    return {
      ...operator,
      votes: operator.votes.map((vote) => ({
        ...vote,
        createdAt: vote.createdAt.toISOString(), // Serialize Date object
      })),
      voteCounts,
    };
  });

  return {
    props: {
      initialOperators: operatorsWithVoteCounts,
    },
    revalidate: 3600, // Revalidate every 60 seconds
  };
}

export default function Home({ initialOperators }: { initialOperators: Operator[] }) {
  const [operators, setOperators] = useState<Operator[]>(initialOperators);

  const getOperatorsByTierAndClass = (tier: string, className: string) => {
    return operators.filter(
      (operator) => operator.tier === tier && operator.class.toLowerCase() === className.toLowerCase()
    );
  };

  const handleVote = async (operatorId: string, voteType: keyof Operator['voteCounts']) => {
    // Optimistically update the local state
    setOperators((prevOperators) =>
      prevOperators.map((operator) => {
        if (operator.id === operatorId) {
          return {
            ...operator,
            voteCounts: {
              ...operator.voteCounts,
              [voteType]: operator.voteCounts[voteType] + 1,
            },
          };
        }
        return operator;
      })
    );

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operatorId, voteType }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);

        // Rollback the optimistic update in case of an error
        setOperators((prevOperators) =>
          prevOperators.map((operator) => {
            if (operator.id === operatorId) {
              return {
                ...operator,
                voteCounts: {
                  ...operator.voteCounts,
                  [voteType]: operator.voteCounts[voteType] - 1,
                },
              };
            }
            return operator;
          })
        );

        return;
      }

      console.log(`Vote recorded: Operator ${operatorId}, Type ${voteType}`);
    } catch (error) {
      console.error('Error recording vote:', error);

      // Rollback the optimistic update in case of an error
      setOperators((prevOperators) =>
        prevOperators.map((operator) => {
          if (operator.id === operatorId) {
            return {
              ...operator,
              voteCounts: {
                ...operator.voteCounts,
                [voteType]: operator.voteCounts[voteType] - 1,
              },
            };
          }
          return operator;
        })
      );

      alert('Failed to record vote. Please try again.');
    }
  };

  return (
    <div className="w-[4300px] p-4 bg-gray-900 text-white min-h-screen mx-auto">
      {/* Main Grid Container */}
      <div
        className="grid gap-4"
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
            <div className="text-center font-bold bg-gray-800 border border-gray-700 p-2">{tier}</div>
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
                        <div key={operator.id} className="flex flex-col items-center mb-4 bg-gray-700 p-4 rounded-lg">
                          <img
                            src={`/avatars/${operator.img}.png` || 'https://via.placeholder.com/100'}
                            alt={operator.name}
                            className="w-16 h-16 rounded-full mb-2 border border-gray-600"
                          />
                          <div className="text-center font-bold">{operator.name}</div>
                          <div className="text-center mt-2">
                            {/* Vote Buttons */}
                            <div className="flex items-center mt-2 space-x-1">
                              <button
                                className="w-8 bg-green-500 text-white px-2 py-1 rounded"
                                onClick={() => handleVote(operator.id, 'UPVOTE')}
                              >
                                {operator.voteCounts.UPVOTE}
                              </button>
                              <button
                                className="w-8 bg-gray-300 text-black px-2 py-1 rounded"
                                onClick={() => handleVote(operator.id, 'NEUTRAL')}
                              >
                                {operator.voteCounts.NEUTRAL}
                              </button>
                              <button
                                className="w-8 bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => handleVote(operator.id, 'DOWNVOTE')}
                              >
                                {operator.voteCounts.DOWNVOTE}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
