import React from 'react';

export default function SimpleSignalFeed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <img
              src="/logos/ledgecryptlogolarge.png"
              alt="LedgeCrypt Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-white">
            LedgeCrypt Signal Feed
          </h1>
          <p className="text-gray-400">Mock signals working perfectly!</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Test Signal</h2>
            <p className="text-gray-300">
              This proves our components can work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
