
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { PenLine, Calendar, Settings } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'New Entry', icon: <PenLine className="w-5 h-5" /> },
    { path: '/timeline', label: 'Timeline', icon: <Calendar className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center items-center animate-slide-up">
      <div className="glass-card px-6 py-3 flex space-x-8 transition-all duration-300 ease-out">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-200",
                isActive 
                  ? "text-accent scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;
