"use client";

import { LOGOS } from "@/lib/constants";

export default function LogoTicker() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50 overflow-hidden">
      <div className="container-custom mb-6">
        <p className="text-center text-sm text-gray-400 font-medium tracking-widest uppercase">
          Trusted by industrial teams at
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-ticker whitespace-nowrap">
          {doubled.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="inline-flex items-center mx-10 text-gray-300 hover:text-gray-500 transition-colors duration-300"
            >
              <span className="text-lg font-bold tracking-tight">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}