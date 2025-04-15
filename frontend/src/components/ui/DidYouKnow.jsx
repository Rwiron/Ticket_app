import React, { useState, useEffect } from "react";
import {
  FaLightbulb,
  FaRobot,
  FaGlobeAmericas,
  FaPaw,
  FaCode,
  FaHeartbeat,
  FaFlask,
  FaRegLaughBeam,
  FaBuilding,
  FaFootballBall,
  FaMusic,
  FaBook,
  FaSpaceShuttle,
} from "react-icons/fa";

const DidYouKnow = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Collection of interesting facts
  const didYouKnowFacts = [
    // IT/Technology Facts
    {
      category: "IT",
      icon: <FaCode />,
      color: "#00b2ef",
      fact: "The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing issues in the Harvard Mark II computer.",
    },
    {
      category: "IT",
      icon: <FaCode />,
      color: "#00b2ef",
      fact: "The average smartphone today has more computing power than all of NASA had during the Apollo moon mission in 1969.",
    },
    {
      category: "IT",
      icon: <FaCode />,
      color: "#00b2ef",
      fact: "The first computer programmer was a woman. Ada Lovelace wrote the first algorithm intended for implementation on Charles Babbage's Analytical Engine.",
    },
    {
      category: "IT",
      icon: <FaCode />,
      color: "#00b2ef",
      fact: "About 90% of the world's currency is digital and exists only on computers.",
    },
    {
      category: "IT",
      icon: <FaCode />,
      color: "#00b2ef",
      fact: "The first webcam was created at Cambridge University to monitor a coffee pot, allowing researchers to check if coffee was ready without leaving their desks.",
    },

    // World History Facts
    {
      category: "World History",
      icon: <FaGlobeAmericas />,
      color: "#e8c745",
      fact: "The shortest war in history was between Britain and Zanzibar on August 27, 1896. It lasted only 38 minutes.",
    },
    {
      category: "World History",
      icon: <FaGlobeAmericas />,
      color: "#e8c745",
      fact: "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
    },
    {
      category: "World History",
      icon: <FaGlobeAmericas />,
      color: "#e8c745",
      fact: "The ancient Egyptians used slabs of stones as pillows, believing that it helped keep demons away.",
    },
    {
      category: "World History",
      icon: <FaGlobeAmericas />,
      color: "#e8c745",
      fact: "In ancient Rome, it was considered a sign of leadership to be born with a crooked nose.",
    },
    {
      category: "World History",
      icon: <FaGlobeAmericas />,
      color: "#e8c745",
      fact: "Vikings used the bones of slain animals to make their skis for winter transportation.",
    },

    // Animals Facts
    {
      category: "Animals",
      icon: <FaPaw />,
      color: "#0ca74f",
      fact: "Octopuses have three hearts, nine brains, and blue blood. Two hearts pump blood to the gills, while the third pumps it to the rest of the body.",
    },
    {
      category: "Animals",
      icon: <FaPaw />,
      color: "#0ca74f",
      fact: "A group of flamingos is called a 'flamboyance', while a group of pandas is called an 'embarrassment'.",
    },
    {
      category: "Animals",
      icon: <FaPaw />,
      color: "#0ca74f",
      fact: "Dolphins have names for each other and can call each other by specific whistles.",
    },
    {
      category: "Animals",
      icon: <FaPaw />,
      color: "#0ca74f",
      fact: "Cows have best friends and get stressed when they are separated from them.",
    },
    {
      category: "Animals",
      icon: <FaPaw />,
      color: "#0ca74f",
      fact: "Elephants are the only mammals that can't jump, and they also can recognize themselves in a mirror – a sign of self-awareness.",
    },

    // AI Facts
    {
      category: "AI",
      icon: <FaRobot />,
      color: "#9c27b0",
      fact: "The term 'Artificial Intelligence' was first coined by John McCarthy at the Dartmouth Conference in 1956, considered the birthplace of AI.",
    },
    {
      category: "AI",
      icon: <FaRobot />,
      color: "#9c27b0",
      fact: "The first AI system to defeat a world chess champion was IBM's Deep Blue, which beat Garry Kasparov in 1997.",
    },
    {
      category: "AI",
      icon: <FaRobot />,
      color: "#9c27b0",
      fact: "AI researchers believe there is a 50% chance that AI will outperform humans in all tasks within 45 years.",
    },
    {
      category: "AI",
      icon: <FaRobot />,
      color: "#9c27b0",
      fact: "The Turing Test, proposed by Alan Turing in 1950, is a test of a machine's ability to exhibit intelligent behavior equivalent to a human.",
    },
    {
      category: "AI",
      icon: <FaRobot />,
      color: "#9c27b0",
      fact: "Facial recognition AI can now identify individuals even when they're wearing masks, with accuracy rates over 90%.",
    },

    // Medical Facts
    {
      category: "Medicine",
      icon: <FaHeartbeat />,
      color: "#f44336",
      fact: "The human heart beats about 115,000 times each day, pumping about 2,000 gallons of blood through the body.",
    },
    {
      category: "Medicine",
      icon: <FaHeartbeat />,
      color: "#f44336",
      fact: "The human body has enough iron in it to make a nail 3 inches long.",
    },
    {
      category: "Medicine",
      icon: <FaHeartbeat />,
      color: "#f44336",
      fact: "Your body contains about 100 trillion cells, but only about 10 percent of those cells are human. The rest are bacteria, viruses, and other microorganisms.",
    },

    // Science Facts
    {
      category: "Science",
      icon: <FaFlask />,
      color: "#4caf50",
      fact: "If you could fold a piece of paper 42 times, it would reach the moon. This is due to exponential growth.",
    },
    {
      category: "Science",
      icon: <FaFlask />,
      color: "#4caf50",
      fact: "Bananas are naturally radioactive due to their potassium content, but the radiation level is too low to cause harm.",
    },
    {
      category: "Science",
      icon: <FaFlask />,
      color: "#4caf50",
      fact: "One lightning bolt can contain up to one billion volts of electricity.",
    },

    // Fun Facts
    {
      category: "Fun Facts",
      icon: <FaRegLaughBeam />,
      color: "#ff9800",
      fact: "The average person will spend six months of their life waiting at red lights.",
    },
    {
      category: "Fun Facts",
      icon: <FaRegLaughBeam />,
      color: "#ff9800",
      fact: "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis, but only 225 Earth days to go around the sun.",
    },
    {
      category: "Fun Facts",
      icon: <FaRegLaughBeam />,
      color: "#ff9800",
      fact: "There are more possible iterations of a game of chess than there are atoms in the known universe.",
    },

    // Business Facts
    {
      category: "Business",
      icon: <FaBuilding />,
      color: "#607d8b",
      fact: "Apple's first logo featured Sir Isaac Newton sitting under an apple tree, not the apple silhouette we know today.",
    },
    {
      category: "Business",
      icon: <FaBuilding />,
      color: "#607d8b",
      fact: "The founders of Google initially opposed the idea of advertising on their search engine before introducing AdWords in 2000.",
    },

    // Sports Facts
    {
      category: "Sports",
      icon: <FaFootballBall />,
      color: "#2196f3",
      fact: "The Olympic flag's five rings represent the five continents from which athletes come to compete in the games.",
    },
    {
      category: "Sports",
      icon: <FaFootballBall />,
      color: "#2196f3",
      fact: "The longest tennis match ever lasted for 11 hours and 5 minutes, played over three days at Wimbledon in 2010.",
    },

    // Music Facts
    {
      category: "Music",
      icon: <FaMusic />,
      color: "#e91e63",
      fact: "The longest concert in history was held by a high school band, lasting 100 hours.",
    },
    {
      category: "Music",
      icon: <FaMusic />,
      color: "#e91e63",
      fact: "Monaco's national orchestra is bigger than its army. The orchestra has 85 musicians, while the army has just 82 soldiers.",
    },

    // Literature Facts
    {
      category: "Literature",
      icon: <FaBook />,
      color: "#795548",
      fact: "The longest novel ever published is 'Remembrance of Things Past' by Marcel Proust, containing an estimated 9,609,000 characters.",
    },
    {
      category: "Literature",
      icon: <FaBook />,
      color: "#795548",
      fact: "Dr. Seuss wrote 'Green Eggs and Ham' after his publisher bet him he couldn't write a book using fewer than 50 different words.",
    },

    // Space Facts
    {
      category: "Space",
      icon: <FaSpaceShuttle />,
      color: "#3f51b5",
      fact: "There is a planet made of diamonds, called 55 Cancri e, which is twice the size of Earth.",
    },
    {
      category: "Space",
      icon: <FaSpaceShuttle />,
      color: "#3f51b5",
      fact: "One day on Mercury is equivalent to 176 Earth days, while one year is just 88 Earth days.",
    },
    {
      category: "Space",
      icon: <FaSpaceShuttle />,
      color: "#3f51b5",
      fact: "The largest known star, UY Scuti, is approximately 1,700 times larger than our Sun.",
    },
  ];

  // Auto-rotate through facts every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(
        (prevIndex) => (prevIndex + 1) % didYouKnowFacts.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [didYouKnowFacts.length]);

  // Manual rotation
  const showNextFact = () => {
    setCurrentFactIndex(
      (prevIndex) => (prevIndex + 1) % didYouKnowFacts.length
    );
  };

  const showPrevFact = () => {
    setCurrentFactIndex((prevIndex) =>
      prevIndex === 0 ? didYouKnowFacts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaLightbulb className="text-[#e8c745] mr-2" /> Did You Know?
        </h3>
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${didYouKnowFacts[currentFactIndex].color}20`,
            color: didYouKnowFacts[currentFactIndex].color,
          }}
        >
          {didYouKnowFacts[currentFactIndex].category}
        </span>
      </div>

      <div className="relative min-h-[120px]">
        <div className="flex items-start gap-3 pb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{
              backgroundColor: didYouKnowFacts[currentFactIndex].color,
            }}
          >
            {didYouKnowFacts[currentFactIndex].icon}
          </div>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed">
              {didYouKnowFacts[currentFactIndex].fact}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
        <button
          onClick={showPrevFact}
          className="text-gray-500 hover:text-[#00b2ef] transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-1 flex-wrap justify-center max-w-[200px]">
          {didYouKnowFacts.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentFactIndex === index ? "bg-[#00b2ef] w-4" : "bg-gray-300"
              }`}
              onClick={() => setCurrentFactIndex(index)}
            />
          ))}
        </div>

        <button
          onClick={showNextFact}
          className="text-gray-500 hover:text-[#00b2ef] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DidYouKnow;
