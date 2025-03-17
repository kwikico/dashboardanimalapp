import React from 'react';

interface EmojiProps {
  symbol: string;
  label?: string;
  className?: string;
}

export const Emoji: React.FC<EmojiProps> = ({ symbol, label, className = '' }) => (
  <span
    className={`emoji ${className}`}
    role="img"
    aria-label={label || ''}
    aria-hidden={!label}
  >
    {symbol}
  </span>
);

// Predefined emoji constants for consistent usage
export const EMOJIS = {
  // Animals
  DOG: '🐕',
  PUPPY: '🐶',
  PAW: '🐾',
  
  // Health
  HEART: '❤️',
  MEDICAL: '🩺',
  VACCINE: '💉',
  CHECKMARK: '✅',
  
  // Gender
  MALE: '♂️',
  FEMALE: '♀️',
  
  // Achievements
  TROPHY: '🏆',
  MEDAL: '🥇',
  RIBBON: '🏅',
  STAR: '⭐',
  
  // Time/Calendar
  CALENDAR: '📅',
  CLOCK: '⏰',
  HOURGLASS: '⏳',
  
  // UI Elements
  HOME: '🏠',
  SETTINGS: '⚙️',
  PLUS: '➕',
  MINUS: '➖',
  SEARCH: '🔍',
  EDIT: '✏️',
  DELETE: '🗑️',
  SAVE: '💾',
  
  // Status
  SUCCESS: '✅',
  WARNING: '⚠️',
  ERROR: '❌',
  INFO: '📝',
  
  // Misc
  TREE: '🌳',
  CHART: '📊',
  DOCUMENT: '📄',
  FOLDER: '📁',
  WAVE: '👋',
  SPARKLES: '✨',
  PAINT: '🎨',
}; 