import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  highlightClassName?: string;
  showText?: boolean;
}

export function Logo({ className, iconClassName, textClassName, highlightClassName = "text-indigo-600", showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative flex items-center justify-center", iconClassName)}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="ikip-logo-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" /> {/* indigo-500 */}
              <stop offset="1" stopColor="#06B6D4" /> {/* cyan-500 */}
            </linearGradient>
            <linearGradient id="ikip-logo-grad-light" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" /> {/* indigo-400 */}
              <stop offset="1" stopColor="#22D3EE" /> {/* cyan-400 */}
            </linearGradient>
          </defs>
          
          {/* Outer Industrial Hexagon */}
          <path 
            d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" 
            stroke="url(#ikip-logo-grad)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Inner Data Lines (Neural/Intelligence) */}
          <path 
            d="M50 5 L50 45 L10 27.5" 
            stroke="url(#ikip-logo-grad-light)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M50 45 L90 27.5" 
            stroke="url(#ikip-logo-grad-light)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M50 45 L50 95" 
            stroke="url(#ikip-logo-grad-light)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Central AI Core Node */}
          <circle cx="50" cy="45" r="10" fill="url(#ikip-logo-grad)" />
          <circle cx="50" cy="45" r="4" fill="#FFFFFF" />
        </svg>
      </div>
      
      {showText && (
        <span className={cn("font-bold tracking-tight", textClassName)}>
          IK<span className={highlightClassName}>IP</span>
        </span>
      )}
    </div>
  );
}
