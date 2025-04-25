import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const MIN_PRICE = 0;
const MAX_PRICE = 8000;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 8000;
const BAR_COUNT = 80;

const FilterSearch: React.FC = () => {
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const rangeHighlightRef = useRef<HTMLDivElement>(null);
  const [leftPosition, setLeftPosition] = useState(
    ((DEFAULT_MIN - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  );
  const [rightPosition, setRightPosition] = useState(
    100 - ((DEFAULT_MAX - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  );
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX);

  useEffect(() => {
    generateBars();
    window.addEventListener('resize', generateBars);
    return () => window.removeEventListener('resize', generateBars);
  }, [leftPosition, rightPosition]);

  const generateBars = () => {
    const container = barsContainerRef.current;
    if (!container) return;
    container.innerHTML = '';
    const barCount = window.innerWidth < 640 ? BAR_COUNT : 100;

    for (let i = 0; i < barCount; i++) {
      const x = (i - barCount / 2) / (barCount / 4);
      const height = 5 + Math.exp(-(x * x)) * (window.innerWidth < 640 ? 60 : 70);

      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${height}px`;
      container.appendChild(bar);
    }

    updateBarColors();
  };

  const updateBarColors = () => {
    const bars = barsContainerRef.current?.querySelectorAll<HTMLDivElement>('.bar') || [];
    const container = barsContainerRef.current?.parentElement;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const barWidth = window.innerWidth < 640 ? 5 : 6;

    const leftPixel = (leftPosition / 100) * containerWidth;
    const rightPixel = containerWidth - (rightPosition / 100) * containerWidth;

    bars.forEach((bar, index) => {
      const barLeft = index * barWidth;
      const barRight = barLeft + (window.innerWidth < 640 ? 3 : 4);

      bar.classList.toggle('in-range', barLeft >= leftPixel && barRight <= rightPixel);
    });
  };

  const updatePrices = () => {
    const currentMin = Math.round(MIN_PRICE + (leftPosition / 100) * (MAX_PRICE - MIN_PRICE));
    const currentMax = Math.round(MAX_PRICE - (rightPosition / 100) * (MAX_PRICE - MIN_PRICE));

    setMinPrice(currentMin);
    setMaxPrice(currentMax >= MAX_PRICE ? MAX_PRICE + 1 : currentMax);
  };

  useEffect(updatePrices, [leftPosition, rightPosition]);

  return (
    <div className="max-w-2xl mx-auto p-4 w-full">
      <header className="flex items-center mb-4">
        <button className="text-blue-500">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-center flex-grow text-lg font-semibold">Filtrer la recherche</h1>
      </header>

      <main>
        {/* City Filter */}
        <section className="mb-4">
          <label className="block text-sm font-medium mb-1">Ville</label>
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <select className="w-full sm:w-1/2 p-2 border rounded">
              <option>Laâyoune</option>
              <option>boujdour</option>
              <option>smara</option>
            </select>
            <select className="w-full sm:w-1/2 p-2 border rounded">
              <option>Quartier Al Wifaq</option>
              <option>Quartier 25 march</option>
            </select>
          </div>
        </section>

        {/* Property Type Filter */}
        <section className="mb-4">
          <label className="block text-sm font-medium mb-1">Type de propriété</label>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 border rounded bg-blue-100 text-blue-500">Tout</button>
            <button className="p-2 border rounded bg-gray-100">Appartement</button>
            <button className="p-2 border rounded bg-gray-100">Garconniere</button>
          </div>
        </section>

        {/* Tenant Type Filter */}
        <section className="mb-4">
          <label className="block text-sm font-medium mb-1">Type locataire</label>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 border rounded bg-blue-100 text-blue-500">Tous</button>
            <button className="p-2 border rounded bg-gray-100">Famille</button>
            <button className="p-2 border rounded bg-gray-100">Étudiants</button>
          </div>
        </section>

        {/* Rooms Filter */}
        <section className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium">Chambres</label>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-100">-</button>
            <span className="text-center">Tout</span>
            <button className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-100">+</button>
          </div>
        </section>

        {/* Price Range Filter */}
        <div className="w-full px-4 sm:px-8">
          <div className="mb-4">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Prix</h1>
            <p className="text-xs sm:text-sm text-gray-600">Définissez votre fourchette de prix</p>
          </div>

          <div className="relative h-28 sm:h-32 mb-6 sm:mb-8">
            <div className="range-line"></div>
            <div ref={rangeHighlightRef} className="range-highlight"></div>
            <div ref={barsContainerRef} className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 flex items-end justify-center" />

            <div className="knob left">
              <div className="tooltip">Prix minimum</div>
            </div>
            <div className="knob right">
              <div className="tooltip">Prix maximum</div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-left">
              <div className="text-xs sm:text-sm font-medium text-gray-500">Minimum</div>
              <div className="text-base sm:text-lg font-semibold text-blue-800">{minPrice}</div>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm font-medium text-gray-500">Maximum</div>
              <div className="text-base sm:text-lg font-semibold text-blue-800">
                {maxPrice > MAX_PRICE ? `${MAX_PRICE}+` : maxPrice}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-6">
        <button className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Appliquer
        </button>
      </footer>
    </div>
  );
};

export default FilterSearch;