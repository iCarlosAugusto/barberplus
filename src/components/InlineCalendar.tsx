import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, isSameDay, isToday } from 'date-fns';

// TypeScript interfaces
interface DatePickerProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  daysToShow?: number;
  primaryColor?: string;
}

const BeautyDatePicker: React.FC<DatePickerProps> = ({
  onDateSelect,
  initialDate = new Date(),
  daysToShow = 14,
  primaryColor = '#ff6b81'
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [dates, setDates] = useState<Date[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Generate array of dates using date-fns
  useEffect(() => {
    const dateArray: Date[] = [];
    const today = new Date();
    
    // Add dates starting from today
    for (let i = 0; i < daysToShow; i++) {
      dateArray.push(addDays(today, i));
    }
    
    setDates(dateArray);
  }, [daysToShow]);

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  // Mouse drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 0.8; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Scroll functions
  const scrollLeftButton = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRightButton = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Select Date</h3>
          <div className="flex space-x-2">
            <button
              onClick={scrollLeftButton}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={scrollRightButton}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-2 hide-scrollbar cursor-grab"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flex space-x-3 px-1 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 min-w-16 ${
                  isSameDay(selectedDate, date)
                    ? `bg-opacity-100 text-white shadow-md`
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: isSameDay(selectedDate, date) ? primaryColor : undefined
                }}
              >
                <span className="text-xs font-medium mb-1">
                  {format(date, 'EEE')}
                </span>
                <span className={`text-xl font-bold ${isToday(date) && !isSameDay(selectedDate, date) ? 'text-pink-500' : ''}`}>
                  {format(date, 'd')}
                </span>
                {isToday(date) && (
                  <span className="text-xs mt-1 font-medium">
                    Today
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-gray-500 text-sm">
          <span className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
        </p>
      </div>
    </div>
  );
};

export { BeautyDatePicker };