import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ProfileTab from '@/components/quiz-results/ProfileTab';
import DailyActivitiesTab from '@/components/quiz-results/DailyActivitiesTab';
import AchievementsTab from '@/components/quiz-results/AchievementsTab';
import ResultsTabs from '@/components/quiz-results/ResultsTabs';
import { 
  coffeeFacts, 
  miniGames,
  moodCoffeeMatches,
  achievementBadges
} from "@/utils/personaData";

// Default persona data for the landing page
const defaultPersona = {
  "The Dreamer": {
    description: "Thoughtful and creative, you enjoy a smooth coffee that inspires your imagination.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-blue-400 to-purple-500",
    icon: "✨",
    product: {
      name: "NESCAFÉ Gold",
      image: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "A smooth, aromatic blend to inspire your creative thoughts."
    },
    coupon: "DREAM20"
  }
};

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [dailyFact] = useState<string>(coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)]);
  const [currentStreak] = useState<number>(5);
  const [avatarCustomization] = useState({
    hairStyle: "short",
    facialFeature: "none",
    outfit: "casual",
    accessory: "coffee cup"
  });
  const [todayMood] = useState<string>("Energized");
  const [moodRecipe] = useState(moodCoffeeMatches["Energized"]);
  const [todayGame] = useState(miniGames[0]);
  const [earnedBadges] = useState<string[]>(["first-brew", "streak-starter"]);

  const personaName = "The Dreamer";
  const persona = defaultPersona[personaName];

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(persona.coupon);
  };

  const handleUpdateMood = (mood: string) => {
    console.log("Mood updated:", mood);
  };

  const handlePlayGame = () => {
    console.log("Playing game:", todayGame.name);
  };

  return (
    <section className="py-16 bg-nescafe-cream">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl">{persona.icon}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">Your Coffee Persona</h2>
          <div className="inline-block px-6 py-3 bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xl font-semibold rounded-full mb-4">
            {personaName}
          </div>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">
            {persona.description}
          </p>
        </div>

        {/* Tabs Navigation */}
        <ResultsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <ProfileTab 
            persona={persona} 
            personaName={personaName}
            handleCopyCoupon={handleCopyCoupon}
          />
        )}

        {/* Daily Activities Tab */}
        {activeTab === 'daily' && (
          <DailyActivitiesTab 
            currentStreak={currentStreak}
            dailyFact={dailyFact}
            todayMood={todayMood}
            moodRecipe={moodRecipe}
            todayGame={todayGame}
            handleUpdateMood={handleUpdateMood}
            handlePlayGame={handlePlayGame}
            moodCoffeeMatches={moodCoffeeMatches}
          />
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <AchievementsTab 
            persona={persona}
            personaName={personaName}
            currentStreak={currentStreak}
            earnedBadges={earnedBadges}
            avatarCustomization={avatarCustomization}
            setAvatarCustomization={() => {}}
            achievementBadges={achievementBadges}
          />
        )}
      </div>
    </section>
  );
};

export default ProfileSection; 