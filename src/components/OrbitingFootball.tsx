import React from 'react';

export default function OrbitingFootball() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-12 h-12">
        {/* Orbital paths */}
        <div className="absolute inset-0 rounded-full border border-blue-200 dark:border-blue-800 opacity-30 animate-spin-slow"></div>
        <div className="absolute inset-1 rounded-full border border-red-200 dark:border-red-800 opacity-40 animate-spin-reverse"></div>
        
        {/* Football */}
        <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-orbit">
          <div className="absolute inset-0 rounded-full bg-white opacity-30"></div>
          {/* Football pattern */}
          <div className="absolute inset-0.5 rounded-full border border-orange-800 opacity-50"></div>
          <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-orange-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}