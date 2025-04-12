
import { forwardRef, memo, ReactNode } from 'react';
import { columnGap, gridSize } from './constants';

type BoardProps = {
  children: ReactNode;
};



const Board = forwardRef<HTMLDivElement, BoardProps>(
  ({ children }: BoardProps, ref) => {
    return (
        <div
        ref={ref}
        className="flex flex-row justify-center gap-[var(--column-gap)] h-[480px] w-full"
        style={{
          // You can set custom variables like this
          '--grid': `${gridSize}px`,
          '--column-gap': `${columnGap}px`,
        } as React.CSSProperties}
      >
        {children}
      </div>
      
    );
  },
);

export default memo(Board);
