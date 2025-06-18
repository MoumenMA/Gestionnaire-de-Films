import React from 'react';
import { Link } from 'react-router-dom';

export const Nopage = () => {
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-9xl font-bold text-gray-800 -z-10">
              404
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Page Introuvable</h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Oups ! Il semblerait que cette page n'existe pas dans notre catalogue. 
            Elle a peut-être été supprimée ou l'URL est incorrecte.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Retour à l'accueil</span>
          </Link>

          <Link
            to="/recherche"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Rechercher un film</span>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};