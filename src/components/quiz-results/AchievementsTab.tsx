import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface AchievementsTabProps {
  persona: any;
  personaName: string;
  currentStreak: number;
  earnedBadges: string[];
  avatarCustomization: {
    hairStyle: string;
    facialFeature: string;
    outfit: string;
    accessory: string;
  };
  setAvatarCustomization: React.Dispatch<React.SetStateAction<{
    hairStyle: string;
    facialFeature: string;
    outfit: string;
    accessory: string;
  }>>;
  achievementBadges: any[];
}

const leaderboardData = [
  { rank: 1, name: "Coffee Master", persona: "The Zen Master", points: 1250, avatar: "🧘" },
  { rank: 2, name: "Bean Hunter", persona: "The Adventurer", points: 980, avatar: "🌍" },
  { rank: 3, name: "Brew Expert", persona: "The Hustler", points: 740, avatar: "💼" },
  { rank: 4, name: "You", persona: "Your Persona", points: 350, avatar: "☕", highlight: true },
  { rank: 5, name: "Sip Savvy", persona: "The Dreamer", points: 310, avatar: "✨" },
];

const AchievementsTab = ({ 
  persona, 
  personaName, 
  currentStreak, 
  earnedBadges, 
  avatarCustomization,
  setAvatarCustomization,
  achievementBadges
}: AchievementsTabProps) => {
  return (
    <div className="space-y-8">
      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white">Coffee Masters Leaderboard</h2>
        </div>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Coffee Master</TableHead>
                <TableHead>Persona</TableHead>
                <TableHead className="text-right">Aroma Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow key={index} className={user.highlight ? "bg-amber-50" : ""}>
                  <TableCell className="font-medium">
                    {user.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="mr-2 text-xl">{user.avatar}</div>
                      <div className={user.highlight ? "font-bold text-amber-700" : ""}>
                        {user.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.persona}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {user.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-center text-sm text-gray-500">
            Keep engaging to earn more Aroma Points and climb the leaderboard!
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6">
          <h2 className="text-2xl font-bold text-white">Your Achievement Badges</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievementBadges.map(badge => {
              const isEarned = earnedBadges.includes(badge.id);
              
              return (
                <div 
                  key={badge.id} 
                  className={`border rounded-lg p-4 text-center ${isEarned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                >
                  <div className="text-4xl mb-2">{badge.image}</div>
                  <h3 className="font-bold">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <div className="text-xs font-semibold text-yellow-600">
                    {isEarned ? 'EARNED' : 'LOCKED'} • {badge.points} Points
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;
