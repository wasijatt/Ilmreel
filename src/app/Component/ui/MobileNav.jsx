"use client";
import React from 'react';
import { Home, Compass, Upload, User } from 'lucide-react';
import SidebarItem from './SidebarItem';

const MobileNav = ({ activeItem, onItemClick }) => {
  const mobileItems = [
    { icon: Home, label: "For You" },
    { icon: Compass, label: "Explore" },
    { icon: Upload, label: "Upload" },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light border-t border-secondary-200 md:hidden h-mobile-nav shadow-sidebar">
      <div className="flex justify-around items-center p-2 h-full">
        {mobileItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            onClick={() => onItemClick(item.label)}
            className="flex-1"
          />
        ))}
      </div>
    </div>
  );
};

export default MobileNav; 