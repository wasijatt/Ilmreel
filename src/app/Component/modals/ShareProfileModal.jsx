"use client";
import React, { useState } from "react";
import { X, Copy, Check, MessageCircle ,Facebook ,Twitter  } from "lucide-react";

/**
 * ShareProfileModal Component
 * Modal for sharing user profile with various platforms
 */
const ShareProfileModal = ({ isOpen, onClose, userProfile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate profile URL
  const profileUrl = `${window.location.origin}/profile/${userProfile.username}`;
  
  // Share text
  const shareText = `Check out ${userProfile.displayName}'s profile on Ilmreel!`;

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = profileUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Share to WhatsApp
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Share to Telegram
  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
  };

  // Share to Twitter
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  // Share to Facebook
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  // Native Web Share API (if supported)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userProfile.displayName}'s Profile`,
          text: shareText,
          url: profileUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MessageCircle/>,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: handleWhatsAppShare
    },

    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter />,
      color: 'bg-sky-500 hover:bg-sky-600',
      onClick: handleTwitterShare
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: handleFacebookShare
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl md:text-3xl  font-bold text-primary-600">Share Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-primary-600 hover:text-white " />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Profile Preview */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 overflow-hidden flex-shrink-0">
                {userProfile.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{userProfile.displayName}</h3>
                <p className="text-sm text-gray-400">@{userProfile.username}</p>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-medium text-primary-600 mb-3">Share to</h3>
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.onClick}
                    className={`flex items-center gap p-3 text-center md:px-6 ${option.color} text-white rounded-lg transition-colors font-medium`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    {/* <span>{option.name}</span> */}
                  </button>
                ))}
              </div>

              {/* Native Share (if supported) */}
              {navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                >
                
                  <span>More Options</span>
                </button>
              )}
            </div>

            {/* Copy Link */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary-600">Or copy link</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className="flex-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Code Option (Optional) */}
            {/* <div className="mt-6 pt-4 border-t border-gray-700">
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
                <span className="text-lg">📱</span>
                <span>Show QR Code</span>
              </button>
            </div> */}


            
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareProfileModal;