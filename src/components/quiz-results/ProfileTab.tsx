import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarCustomization, setAvatarCustomization] = useState({
    hairStyle: "short",
    facialFeature: "none", 
    outfit: "casual",
    accessory: "coffee cup"
  });
  const { toast } = useToast();

  const handleSaveAvatar = () => {
    toast({
      title: "Avatar Saved!",
      description: "Your coffee avatar has been updated successfully.",
    });
    setIsAvatarModalOpen(false);
  };

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
        
        {/* Stats - Now with 4 items including Aroma Points */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold">47</div>
            <div className="text-amber-100 text-xs">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">350</div>
            <div className="text-amber-100 text-xs">Aroma Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">23</div>
            <div className="text-amber-100 text-xs">Recipes Tried</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-amber-100 text-xs">Achievements</div>
          </div>
        </div>
        
        {/* Customize Avatar Button with Modal */}
        <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white border-0 backdrop-blur-sm rounded-2xl py-3 font-semibold transition-all duration-200"
            >
              Customize Avatar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Customize Your Coffee Avatar</DialogTitle>
              <DialogDescription>
                Personalize your avatar to match your coffee personality.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hair Style</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={avatarCustomization.hairStyle}
                  onChange={(e) => setAvatarCustomization({...avatarCustomization, hairStyle: e.target.value})}
                >
                  <option value="short">Short</option>
                  <option value="long">Long</option>
                  <option value="curly">Curly</option>
                  <option value="wavy">Wavy</option>
                  <option value="bald">Bald</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Facial Feature</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={avatarCustomization.facialFeature}
                  onChange={(e) => setAvatarCustomization({...avatarCustomization, facialFeature: e.target.value})}
                >
                  <option value="none">None</option>
                  <option value="glasses">Glasses</option>
                  <option value="beard">Beard</option>
                  <option value="mustache">Mustache</option>
                  <option value="freckles">Freckles</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Outfit</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={avatarCustomization.outfit}
                  onChange={(e) => setAvatarCustomization({...avatarCustomization, outfit: e.target.value})}
                >
                  <option value="casual">Casual</option>
                  <option value="business">Business</option>
                  <option value="sporty">Sporty</option>
                  <option value="creative">Creative</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Accessory</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={avatarCustomization.accessory}
                  onChange={(e) => setAvatarCustomization({...avatarCustomization, accessory: e.target.value})}
                >
                  <option value="coffee cup">Coffee Cup</option>
                  <option value="laptop">Laptop</option>
                  <option value="book">Book</option>
                  <option value="headphones">Headphones</option>
                  <option value="plant">Plant</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAvatarModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAvatar} className="bg-amber-500 hover:bg-amber-600">
                Save Avatar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileTab;
