import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  // Optional prop to determine if component is inside a dialog
  insideDialog?: boolean;
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
const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, insideDialog = false }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const colorPalette = [
    'var(--sky-9)', 'var(--green-9)', 'var(--red-9)', 'var(--yellow-9)', 'var(--plum-9)', 'var(--teal-9)',
    'var(--pink-9)', 'var(--indigo-9)', 'var(--amber-9)', 'var(--orange-9)', 'var(--purple-9)', 'var(--mint-9)'
  ];
  
  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    setShowPicker(false);
  };
  useEffect(() => {
    if (showPicker && buttonRef.current && popupRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      popupRef.current.style.top = `${rect.bottom + window.scrollY + 5}px`;
      popupRef.current.style.left = `${rect.left + window.scrollX - 5}px`;
    }
  }, [showPicker]);

  // Close on outside click - with modifications for dialogs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only process if our refs are valid
      if (buttonRef.current && popupRef.current) {
        // Check if click is outside both the button and popup
        if (!buttonRef.current.contains(e.target as Node) && 
            !popupRef.current.contains(e.target as Node)) {
          setShowPicker(false);
        }
      }
    };
    
    if (showPicker) {
      // Use capturing phase to ensure our handler runs before dialog's handlers
      document.addEventListener('mousedown', handleClickOutside, { capture: true });
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside, { capture: true });
  }, [showPicker]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Color button - square button to select color */}
      <div 
        ref={buttonRef}
        onClick={(e) => {
          // Stop propagation to prevent dialog from closing
          if (insideDialog) {
            e.stopPropagation();
          }
          setShowPicker(!showPicker);
        }}
        style={{
          width: '28px',
          height: '28px',
          backgroundColor: color || 'var(--blue-1)',
          border: '1px solid var(--blue-1)',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      />
      
      {/* Compact color picker popup */}
      {showPicker && (
        <div 
          ref={popupRef}
          onClick={(e) => {
            if (insideDialog) {
              e.stopPropagation();
            }
          }}
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            padding: '12px',
            backgroundColor: 'var(--blue-1)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid var(--blue-1)',
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
                onClick={(e) => {
                  if (insideDialog) {
                    e.stopPropagation();
                  }
                  handleColorSelect(c);
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  ...colorOptionStyle,
                  backgroundColor: c,
                  border: c === color ? '2px solid var(--gray-12)' : '1px solid var(--gray-6)',
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
                onClick={(e) => {
                  // Stop propagation to prevent dialog from closing
                  if (insideDialog) {
                    e.stopPropagation();
                  }
                  handleColorSelect(c);
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  ...colorOptionStyle,
                  backgroundColor: c,
                  border: c === color ? '2px solid var(--gray-1)' : '1px solid var(--gray-12)',
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
