'use client';
import React from 'react';
import { Badge } from '../badge';


type ThemeColor = 'black' | 'gray' | 'indigo' | 'cyan' | 'orange' | 'crimson';

interface MultipleSelectorControlledProps {
  themeColor: ThemeColor;
}

export const BadgeComponent: React.FC<MultipleSelectorControlledProps> = ({ themeColor = "gray", }) => {

  return (
    <div className=" gap-5 px-10 w-[30rem] grid place-content-center space-y-4">
      {/* <p className="text-primary">Your selection: {value.map((val) => val.label).join(', ')}</p> */}
      <Badge color={themeColor} className=' text-xl text-center block w-fit px-3 py-1 capitalize'>Primary</Badge>
    </div>
  );
};
