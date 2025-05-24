import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface DailyActivitiesTabProps {
  currentStreak: number;
  dailyFact: string;
  todayMood: string;
  moodRecipe: any;
  todayGame: any;
  handleUpdateMood: (mood: string) => void;
  handlePlayGame: () => void;
  moodCoffeeMatches: Record<string, any>;
}

const DailyActivitiesTab = ({ 
  currentStreak, 
  dailyFact, 
  todayMood, 
  moodRecipe, 
  todayGame,
  handleUpdateMood,
  handlePlayGame,
  moodCoffeeMatches
}: DailyActivitiesTabProps) => {
  const [brewedDays, setBrewedDays] = useState<Set<string>>(new Set());
  const [streakCount, setStreakCount] = useState(0);
  const [lastBrewDate, setLastBrewDate] = useState<string | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentDayIndex = today.getDay();

  // Initialize data from localStorage
  useEffect(() => {
    const savedBrewedDays = localStorage.getItem('brewedDays');
    const savedStreakCount = localStorage.getItem('streakCount');
    const savedLastBrewDate = localStorage.getItem('lastBrewDate');

    if (savedBrewedDays) {
      setBrewedDays(new Set(JSON.parse(savedBrewedDays)));
    }
    if (savedStreakCount) {
      setStreakCount(parseInt(savedStreakCount));
    }
    if (savedLastBrewDate) {
      setLastBrewDate(savedLastBrewDate);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('brewedDays', JSON.stringify(Array.from(brewedDays)));
    localStorage.setItem('streakCount', streakCount.toString());
    if (lastBrewDate) {
      localStorage.setItem('lastBrewDate', lastBrewDate);
    }
  }, [brewedDays, streakCount, lastBrewDate]);

  const getTodayDateString = () => {
    return today.toISOString().split('T')[0];
  };

  const hasBrewedToday = () => {
    return brewedDays.has(getTodayDateString());
  };

  const handleBrewToday = () => {
    const todayString = getTodayDateString();
    
    if (!hasBrewedToday()) {
      const newBrewedDays = new Set(brewedDays);
      newBrewedDays.add(todayString);
      setBrewedDays(newBrewedDays);

      // Calculate streak
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];

      if (lastBrewDate === yesterdayString || streakCount === 0) {
        setStreakCount(prev => prev + 1);
      } else {
        setStreakCount(1); // Reset streak if not consecutive
      }

      setLastBrewDate(todayString);
    }
  };

  const getWeekDays = () => {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      return {
        date: day,
        dateString: day.toISOString().split('T')[0],
        dayName: daysOfWeek[i],
        isToday: day.toDateString() === today.toDateString(),
        isBrewed: brewedDays.has(day.toISOString().split('T')[0])
      };
    });
  };

  return (
    <div className="space-y-8">
      {/* Daily Brew Streak - Redesigned */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Daily Brew Streak</h2>
            {streakCount > 0 && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-xl">🔥</span>
                <span className="text-white font-bold">{streakCount}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {/* Weekly Calendar Tracker */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-center">This Week's Progress</h3>
            <div className="grid grid-cols-7 gap-2">
              {getWeekDays().map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium text-gray-600 mb-2">
                    {day.dayName}
                  </div>
                  <div
                    className={`relative w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                      day.isBrewed
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg scale-110'
                        : day.isToday
                        ? 'bg-gradient-to-br from-gray-200 to-gray-300 ring-2 ring-amber-400 ring-offset-2'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span
                      className={`text-lg transition-all duration-300 ${
                        day.isBrewed
                          ? 'filter drop-shadow-sm'
                          : day.isToday
                          ? 'opacity-60'
                          : 'opacity-40'
                      }`}
                    >
                      ☕
                    </span>
                    {day.isBrewed && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {day.date.getDate()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Stats */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center space-x-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 shadow-inner">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{streakCount}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
              <div className="w-px h-8 bg-amber-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{brewedDays.size}</div>
                <div className="text-sm text-gray-600">Total Brews</div>
              </div>
            </div>
          </div>

          {/* Brew Today Button */}
          <div className="text-center">
            {!hasBrewedToday() ? (
              <div>
                <p className="text-gray-600 mb-4">Ready for your daily brew?</p>
                <Button
                  onClick={handleBrewToday}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  ☕ Brew Today
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-lg font-semibold text-green-600 mb-2">Daily brew complete!</p>
                <p className="text-sm text-gray-600">Come back tomorrow to continue your streak</p>
                <div className="mt-3 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  +10 Aroma Points earned
                </div>
              </div>
            )}
          </div>

          {/* Motivational Message */}
          <div className="mt-6 text-center">
            {streakCount === 0 && (
              <p className="text-gray-500 text-sm">Start your streak today! ☕</p>
            )}
            {streakCount > 0 && streakCount < 7 && (
              <p className="text-amber-600 text-sm">
                {7 - streakCount} more days to unlock the ☕ Week Warrior badge!
              </p>
            )}
            {streakCount >= 7 && (
              <p className="text-orange-600 text-sm font-semibold">
                🏆 Amazing streak! You're earning bonus points daily!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Daily Coffee Fact */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6">
          <h2 className="text-2xl font-bold text-white">Daily Coffee Fact</h2>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-lg">{dailyFact}</p>
          </div>
          <div className="flex justify-between items-center">
            <span>+5 Aroma Points for reading</span>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Share Fact
            </Button>
          </div>
        </div>
      </div>

      {/* Mood Coffee Match */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6">
          <h2 className="text-2xl font-bold text-white">Today's Mood Coffee Match</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-2">How are you feeling today?</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(moodCoffeeMatches).map(mood => (
                <Button 
                  key={mood} 
                  variant={todayMood === mood ? "default" : "outline"}
                  className={todayMood === mood ? "bg-purple-500 hover:bg-purple-600" : ""}
                  onClick={() => handleUpdateMood(mood)}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>
          
          {moodRecipe && (
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Your {todayMood} Coffee: {moodRecipe.recipe}</h4>
              <p className="text-sm mb-4">{moodRecipe.description}</p>
              <div className="mb-4">
                <h5 className="font-semibold mb-1">Ingredients:</h5>
                <ul className="list-disc pl-5">
                  {moodRecipe.ingredients.map((ingredient: string, i: number) => (
                    <li key={i} className="text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-purple-600">Try this recipe and earn {moodRecipe.aromaPoints} Aroma Points!</p>
            </div>
          )}
        </div>
      </div>

      {/* Daily Mini-Game */}
      {todayGame && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-700 p-6">
            <h2 className="text-2xl font-bold text-white">Today's Mini-Game</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={todayGame.imageUrl} 
                  alt={todayGame.name} 
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2">{todayGame.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {todayGame.difficulty.toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm">Earn up to {todayGame.rewardPoints} Aroma Points</span>
                </div>
                <p className="text-gray-700 mb-4">{todayGame.description}</p>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handlePlayGame}
                >
                  Play Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyActivitiesTab;
