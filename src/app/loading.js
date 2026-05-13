'use client'
import { Plane } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="relative flex flex-col items-center">
        
        {/* Animated Plane & Path */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Pulsing rings to simulate radar or distance */}
          <div className="absolute inset-0 rounded-full bg-cyan-200 animate-ping opacity-20" />
          <div className="absolute inset-4 rounded-full bg-cyan-100 animate-pulse opacity-40" />
          
          {/* Flying Plane Icon */}
          <div className="relative animate-bounce">
            <Plane 
              className="w-12 h-12 text-cyan-600 transform -rotate-12" 
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Preparing your itinerary...
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium animate-pulse">
            Finding the best routes and hidden gems
          </p>
        </div>

        {/* Shimmering Skeleton Cards (Visual Hint of Content) */}
        <div className="mt-12 w-full max-w-sm space-y-4 opacity-50">
          <div className="h-4 w-3/4 bg-slate-200 rounded-full animate-pulse mx-auto" />
          <div className="flex gap-3 justify-center">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-16 h-16 bg-slate-200 rounded-2xl animate-pulse" 
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background World Map Overlay (Optional) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full p-20">
          <path 
            fill="currentColor" 
            d="M150 150 Q 400 50 650 150" 
            className="stroke-slate-900 stroke-[2] fill-none stroke-dasharray-[5,5] animate-[dash_2s_linear_infinite]"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
}