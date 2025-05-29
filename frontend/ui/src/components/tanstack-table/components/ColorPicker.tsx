import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

/**
 * Color picker component that displays on top of other elements
 */
const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Define colors in a single array
  const colors = [
    // Row 1 - Blues
    '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
    // Row 2 - Other colors
    '#fcd34d', '#f97316', '#86efac', '#22c55e', '#ef4444', '#8b5cf6', '#ec4899'
  ];

  // Handle color selection
  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    setShowPicker(false);
  };

  // Update popup position when shown
  useEffect(() => {
    if (showPicker && buttonRef.current && popupRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      popupRef.current.style.top = `${rect.bottom + window.scrollY + 5}px`;
      popupRef.current.style.left = `${rect.left + window.scrollX - 5}px`;
    }
  }, [showPicker]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && popupRef.current && 
          !buttonRef.current.contains(e.target as Node) && 
          !popupRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    
    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPicker]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Color button */}
      <div 
        ref={buttonRef}
        onClick={() => setShowPicker(!showPicker)}
        style={{
          width: '28px',
          height: '28px',
          backgroundColor: color || '#e5e7eb',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      />
      
      {/* Popup color selector */}
      {showPicker && (
        <div 
          ref={popupRef}
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '250px',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            border: '1px solid #ddd',
            zIndex: 9999,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '6px' }}>
            {/* Row 1 - Blues */}
            {colors.slice(0, 7).map((c, i) => (
              <div 
                key={`blue-${i}`}
                onClick={() => handleColorSelect(c)}
                style={{
                  width: '28px', 
                  height: '28px', 
                  backgroundColor: c,
                  borderRadius: '50%',
                  border: c === color ? '2px solid #000' : '1px solid #ddd',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {/* Row 2 - Other colors */}
            {colors.slice(7).map((c, i) => (
              <div 
                key={`color-${i}`}
                onClick={() => handleColorSelect(c)}
                style={{
                  width: '28px', 
                  height: '28px', 
                  backgroundColor: c,
                  borderRadius: '50%',
                  border: c === color ? '2px solid #000' : '1px solid #ddd',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
