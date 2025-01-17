import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image'
import Navbar from '../components/Navbar'

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
const tierGuide = [
  'S+: trivialize most general game content; ridiculously good role compression; best units in the game',
  'S: good in every situation; among the highest damage in the game and best utility',
  'S-: good in almost every situation; exceptional utility, burst damage, or lane holding capabilities; instances of necrosis or true damage are almost always this tier or higher',
  'A+: has a niche and performs exceptionally well within that niche',
  'A: has a niche and performs adequately within that niche',
  'A-: has a small niche but largely overshadowed even in their own niche; because of stats and flexibility of having 3 skills and 2 talents, 6 stars are always this tier or higher',
  'B+: decent damage or utility but there are generally better options; some unique skills or talents land in this tier ',
  'B: limited stats or utility; there is almost always a directly better option',
  'B-: usable and okay for the early game or very very rare niche instances',
  'C+: usable if no other options are available but not advisable',
  'C: not worth investment; better options are easily accessible',
  'C-: very bad and not recommended for use',
  'F: will literally make the game harder for you',
];

const information = [
  'This tier list aims to represent a general meta, not necessarily an end game difficulty meta. Think of their power relative to ex stages but not necessarily challenge mode or contingency contract stages',
  'Each operator can be voted on once per day.',
  'Green vote is for moving an operator up a tier, gray is for keeping them in the same tier, and red is for moving down a tier',
  'Clicking on an operator card will take you to their Arknights Wiki page',
  "For now, I haven't implemented logic to automatically move tiers because I want to get a feel for how this might work so tier changes will be done manually once I (if I ever) start seeing some votes"
];

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
  const [infoOpen, setInfoOpen] = useState(false)
  const [tierGuideOpen, setTierGuideOpen] = useState(false)

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
    <div className="w-[4300px] p-4 bg-gray-900 text-white min-h-screen">
      <Navbar/>

      {/* Rules and Information */}
      <div className="flex flex-wrap gap-4 mb-6 pr-16 w-screen">
        <button
          onClick={() => setInfoOpen(!infoOpen)}
          className="w-full text-left font-bold text-lg mb-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600"
        >
          Introduction {infoOpen ? '▼' : '▲'}
        </button>
        {infoOpen && (
          <div>
            <h2 className="text-xl font-bold mb-2">Information</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {information.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => setTierGuideOpen(!tierGuideOpen)}
          className="w-full text-left font-bold text-lg mb-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600"
        >
          Tier Guide {tierGuideOpen ? '▼' : '▲'}
        </button>
        {tierGuideOpen && (
          <div>
            <h2 className="text-xl font-bold my-2">Tier Guidelines</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {tierGuide.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}
        
      </div>

      {/* Main Grid Container */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: '150px repeat(8, 500px)', // Thin tier column, fixed class columns
        }}
      >
        {/* Empty Top-Left Cell */}
        <div></div>

        {/* Class Headers */}
        {classes.map((className) => (
          <div
            key={`class-${className}`}
            className="text-center font-bold bg-gray-800 border border-gray-700 p-1"
          >
            {className}
          </div>
        ))}

        {/* Rows for Each Tier */}
        {tiers.map((tier) => (
          <React.Fragment key={`tier-${tier}`}>
            <div className="text-center font-bold bg-gray-800 border border-gray-700">{tier}</div>
            {classes.map((className) => {
              const filteredOperators = getOperatorsByTierAndClass(tier, className);

              return (
                <div
                  key={`operator-card-column-${tier}-${className}`}
                  className="border border-gray-700 bg-gray-800 rounded-lg p-2"
                >
                  {filteredOperators.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {filteredOperators.map((operator) => (
                        <Link key={operator.id} href={`https://arknights.wiki.gg/wiki/${operator.id}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-gray-700 rounded-lg">
                          <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
                            <Image
                              src={`/avatars/${operator.img}.png` || 'https://via.placeholder.com/100'}
                              alt={operator.name}
                              width={500}
                              height={500}
                              className="w-16 h-16 rounded-full mb-2 border border-gray-600"
                            />
                            <div className="text-center font-bold">{operator.name}</div>
                            <div className="text-center">
                              {/* Vote Buttons */}
                              <div className="flex items-center mt-2 space-x-1">
                                <button
                                  className="flex items-center justify-center space-x-1 w-8 bg-green-500 text-white px-1 py-1 rounded"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleVote(operator.id, 'UPVOTE')}
                                  }
                                >
                                  <FaArrowUpLong />
                                  <span>{operator.voteCounts.UPVOTE}</span>
                                </button>
                                <button
                                  className="flex items-center justify-center space-x-1 w-8 bg-gray-300 text-black px-1 py-1 rounded"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleVote(operator.id, 'NEUTRAL')}
                                  }
                                >
                                  <span>{operator.voteCounts.NEUTRAL}</span>
                                </button>
                                <button
                                  className="flex items-center justify-center space-x-1 w-8 bg-red-500 text-white px-1 py-1 rounded"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleVote(operator.id, 'DOWNVOTE')}
                                  }
                                >
                                  <FaArrowDownLong />
                                  <span>{operator.voteCounts.DOWNVOTE}</span>
                                </button>
                              </div>

                            </div>
                          </div>
                        </Link>
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
