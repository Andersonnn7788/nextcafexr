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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

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
  const [selectedPersonality, setSelectedPersonality] = useState("Mocha Master");
  const [selectedBackground, setSelectedBackground] = useState("Coffee Beans");
  const [selectedAccessory, setSelectedAccessory] = useState("☕");
  const [selectedFrameStyle, setSelectedFrameStyle] = useState("None");
  const [avatarSize, setAvatarSize] = useState([50]);
  const [rotation, setRotation] = useState([0]);
  const [animationStyle, setAnimationStyle] = useState("Energetic");
  const { toast } = useToast();

  const personalityStyles = [
    { name: "Espresso Explorer", icon: "☕", description: "Bold & Adventurous" },
    { name: "Latte Lover", icon: "🥛", description: "Smooth & Creamy" },
    { name: "Americano Achiever", icon: "📊", description: "Strong & Direct" },
    { name: "Cappuccino Creator", icon: "🎨", description: "Artistic & Frothy" },
    { name: "Mocha Master", icon: "🍫", description: "Sweet & Sophisticated" },
    { name: "Cold Brew Coder", icon: "💻", description: "Cool & Calculated" }
  ];

  const backgrounds = [
    "Coffee Beans", "Cream Swirl", "Golden Hour",
    "Coffee Gradient", "Mocha Swirl", "Mint Fresh"
  ];

  const accessories = [
    "☕", "⭐", "✨", "🌍", "💧", "⚡", "💡", "🚲"
  ];

  const frameStyles = [
    "None", "Circle", "Square", "Hexagon", "Bean Shape"
  ];

  const animationStyles = [
    "Energetic", "Chill", "Excited", "Zen"
  ];

  const handleSaveAvatar = () => {
    toast({
      title: "Avatar Saved! (+50 Aroma Points)",
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
        
        {/* Customize Avatar Button with Enhanced Modal */}
        <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white border-0 backdrop-blur-sm rounded-2xl py-3 font-semibold transition-all duration-200"
            >
              Customize Avatar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
            <DialogHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">☕</span>
              </div>
              <div>
                <DialogTitle className="text-amber-800">Customize Your Coffee Avatar</DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedPersonality} • Sweet & Sophisticated
                </DialogDescription>
              </div>
            </DialogHeader>

            {/* Avatar Preview */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl flex items-center justify-center shadow-lg">
                <div 
                  className="text-4xl transition-transform duration-300"
                  style={{ 
                    transform: `scale(${avatarSize[0] / 50}) rotate(${rotation[0]}deg)`,
                    animation: animationStyle === 'Energetic' ? 'bounce 2s infinite' : 
                              animationStyle === 'Excited' ? 'pulse 1s infinite' : 'none'
                  }}
                >
                  {selectedAccessory}
                </div>
              </div>
            </div>

            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* Style Tab */}
              <TabsContent value="style" className="space-y-6 max-h-[400px] overflow-y-auto">
                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Personality Style</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {personalityStyles.map((style) => (
                      <div
                        key={style.name}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedPersonality === style.name
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setSelectedPersonality(style.name)}
                      >
                        <div className="text-2xl mb-2 text-center">{style.icon}</div>
                        <div className="text-sm font-medium text-center">{style.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Background</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {backgrounds.map((bg) => (
                      <div
                        key={bg}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center text-sm transition-all ${
                          selectedBackground === bg
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setSelectedBackground(bg)}
                      >
                        {bg}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Accessories Tab */}
              <TabsContent value="accessories" className="space-y-6 max-h-[400px] overflow-y-auto">
                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Accessory</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {accessories.map((accessory) => (
                      <div
                        key={accessory}
                        className={`p-4 border-2 rounded-lg cursor-pointer text-center text-2xl transition-all ${
                          selectedAccessory === accessory
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setSelectedAccessory(accessory)}
                      >
                        {accessory}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Frame Style</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {frameStyles.map((frame) => (
                      <div
                        key={frame}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center text-sm transition-all ${
                          selectedFrameStyle === frame
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setSelectedFrameStyle(frame)}
                      >
                        {frame}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6 max-h-[400px] overflow-y-auto">
                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Avatar Size</h4>
                  <div className="px-3">
                    <Slider
                      value={avatarSize}
                      onValueChange={setAvatarSize}
                      max={100}
                      min={20}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Rotation</h4>
                  <div className="px-3">
                    <Slider
                      value={rotation}
                      onValueChange={setRotation}
                      max={180}
                      min={-180}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>-180°</span>
                      <span>180°</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800 mb-4">Animation Style</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {animationStyles.map((animation) => (
                      <div
                        key={animation}
                        className={`p-4 border-2 rounded-xl cursor-pointer text-center transition-all ${
                          animationStyle === animation
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setAnimationStyle(animation)}
                      >
                        <div className="text-lg mb-1">
                          {animation === 'Energetic' ? '⚡' : 
                           animation === 'Chill' ? '😎' :
                           animation === 'Excited' ? '🤩' : '🧘'}
                        </div>
                        <div className="text-sm font-medium">{animation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="pt-4 border-t">
              <Button 
                onClick={handleSaveAvatar}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold"
              >
                Save Avatar (+50 Aroma Points)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileTab;
