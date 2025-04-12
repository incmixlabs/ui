import { memo, useEffect, useRef, useState } from 'react';

import invariant from 'tiny-invariant';

import {Avatar,Button,Heading} from '@incmix/ui';
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
// import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-indicator';
// import {
//   draggable,
//   dropTargetForElements,
// } from '@atlaskit/pragmatic-drag-and-drop/adapter/element';
import {
    draggable,
    dropTargetForElements,
  } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
// import { scrollJustEnoughIntoView } from '@atlaskit/pragmatic-drag-and-drop/scroll-just-enough-into-view';
// eslint-disable-next-line no-restricted-imports

import { Item } from './people';
import { ArrowBigDownDash } from 'lucide-react';
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-indicator/box";
type DraggableState = 'idle' | 'generate-preview' | 'dragging';


export const Card = memo(function Card({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { avatarUrl, itemId, name, role } = item;
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [state, setState] = useState<DraggableState>('idle');

  useEffect(() => {
    invariant(ref.current);
    console.log('recreating draggable');
    return combine(
      draggable({
        element: ref.current,
        getInitialData: () => ({ type: 'card', itemId: itemId }),
        onGenerateDragPreview: ({ source }) => {
        //   scrollJustEnoughIntoView({ element: source.element });
          setState('generate-preview');
        },

        onDragStart: () => setState('dragging'),
        onDrop: () => setState('idle'),
      }),
    //   dropTargetForFiles({
    //     element: ref.current,
    //   }),
      dropTargetForElements({
        element: ref.current,
        canDrop: args => args.source.data.type === 'card',
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: 'card', itemId: itemId };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDragEnter: args => {
          if (args.source.data.itemId !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDrag: args => {
          if (args.source.data.itemId !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      }),
    );
  }, [itemId]);

  return (
    <div
    ref={ref}
    data-testid={`item-${itemId}`}
    className={`w-full relative rounded-md shadow-md bg-white p-4 transition-opacity ${
      state === 'dragging' ? 'opacity-60' : ''
    }`}
  >
    <div className="flex items-center gap-4 w-full">
      <div className="pointer-events-none">
        <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full object-cover" />
      </div>
      <div className="flex flex-col flex-grow gap-1">
        <span className="text-lg font-semibold">{name}</span>
        <small className="m-0 text-sm text-gray-600">{role}</small>
      </div>
      <button className="appearance-none">
        <ArrowBigDownDash />
      </button>
    </div>
    {closestEdge && <DropIndicator edge={closestEdge} gap={`var(--column-gap)`} />}
  </div>
  );
});
