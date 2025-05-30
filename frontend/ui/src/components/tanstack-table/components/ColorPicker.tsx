import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

// Add these styles to your global CSS or add them inline as we do here
const colorOptionStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'transform 0.2s ease'
};

const colorOptionHoverStyle: React.CSSProperties = {
  transform: 'scale(1.15)'
};

/**
 * Simplified color picker component with circular options
 */
const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Define a simpler color palette for the compact design
  const colorPalette = [
    // Row 1
    '#0096FF', '#1CAC78', '#FF5252', '#FFD700', '#9370DB', '#20B2AA',
    // Row 2
    '#E75480', '#4169E1', '#BFFF00', '#FF7F50', '#8A2BE2', '#00CED1'
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
      {/* Color button - square button to select color */}
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
      
      {/* Compact color picker popup */}
      {showPicker && (
        <div 
          ref={popupRef}
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #eaeaea',
            zIndex: 9999,
            width: '200px'
          }}
        >
          {/* First row of colors */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            {colorPalette.slice(0, 6).map((c, i) => (
              <div 
                key={`color-row1-${i}`}
                onClick={() => handleColorSelect(c)}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  ...colorOptionStyle,
                  backgroundColor: c,
                  border: c === color ? '2px solid #000' : '1px solid #ddd',
                  ...(hoveredColor === c ? colorOptionHoverStyle : {})
                }}
              />
            ))}
          </div>

          {/* Second row of colors */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'space-between' 
          }}>
            {colorPalette.slice(6).map((c, i) => (
              <div 
                key={`color-row2-${i}`}
                onClick={() => handleColorSelect(c)}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  ...colorOptionStyle,
                  backgroundColor: c,
                  border: c === color ? '2px solid #000' : '1px solid #ddd',
                  ...(hoveredColor === c ? colorOptionHoverStyle : {})
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
