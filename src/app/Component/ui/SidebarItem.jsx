"use client";
import React from 'react';

const SidebarItem = ({ icon: Icon, label, active = false, onClick, className = "" }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-button cursor-pointer group
        transition-all duration-button ease-button
        hover:scale-105 active:scale-95
        ${active ? 'bg-primary-50' : 'hover:bg-primary-50'}
        ${className}`}
    >
      <Icon 
        size={24} 
        className={`mb-1 transition-colors duration-button ease-button
          ${active ? 'text-primary-600' : 'text-text-light group-hover:text-primary-600'}`} 
      />
      <span className={`text-xs transition-colors duration-button ease-button
        ${active ? 'text-primary-600' : 'text-text-light group-hover:text-primary-600'}`}>
        {label}
      </span>
    </div>
  );
};

export default SidebarItem;