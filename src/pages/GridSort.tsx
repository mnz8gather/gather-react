import { MeasuringStrategy } from '@dnd-kit/core';
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, rectSortingStrategy } from '@dnd-kit/sortable';

import { Sortable, Props as SortableProps } from '@/components/SortGrid/Sortable';
import { GridContainer } from '@/components/SortGrid/GridContainer';

const props: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={2} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: '100%',
    height: '100%',
  }),
};

export default () => {
  const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return <Sortable {...props} animateLayoutChanges={animateLayoutChanges} measuring={{ droppable: { strategy: MeasuringStrategy.Always } }} removable handle />;
};
