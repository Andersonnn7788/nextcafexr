import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfileTabProps {
  persona: any;
  personaName: string;
  handleCopyCoupon: () => void;
}

const ProfileTab = ({ 
  persona, 
  personaName,
  handleCopyCoupon 
}: ProfileTabProps) => {
  return (
    <div className="flex justify-center">
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl p-8 text-white max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute top-8 right-8 w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
        
        {/* Coffee Icon and Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl">☕</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Espresso Explorer</h2>
            <p className="text-amber-100">Level 12 • Bold & Adventurous</p>
          </div>
        </div>
        
        {/* Status Badges */}
        <div className="flex gap-3 mb-8">
          <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>AI Learning</span>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span>Adapting</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold">47</div>
            <div className="text-amber-100 text-sm">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">23</div>
            <div className="text-amber-100 text-sm">Recipes Tried</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">8</div>
            <div className="text-amber-100 text-sm">Achievements</div>
          </div>
        </div>
        
        {/* Customize Avatar Button */}
        <Button 
          className="w-full bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white border-0 backdrop-blur-sm rounded-2xl py-3 font-semibold transition-all duration-200"
        >
          Customize Avatar
        </Button>
      </div>
    </div>
  );
};

export default ProfileTab;
