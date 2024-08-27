import Tree from '@/backend/Tree';
import { DragEvent } from 'react';

export const handleDragStart = (e: DragEvent<HTMLDivElement>, cardId: string) => {
  e.dataTransfer.setData("cardId", cardId);
};

export const handleDrop = (
  e: DragEvent<HTMLDivElement>,
  trees: Tree[],
  setTrees: React.Dispatch<React.SetStateAction<Tree[]>>
) => {
  clearHighlights();

  const cardId = e.dataTransfer.getData("cardId");

  const indicators = getIndicators();
  const { element } = getNearestIndicator(e, indicators);

  const before = element.dataset.before || "-1";

  if (before !== cardId) {
    let copy = [...trees];

    let cardToTransfer = copy.find((c) => c.id === cardId);
    if (!cardToTransfer) return;

    copy = copy.filter((c) => c.id !== cardId);

    const moveToBack = before === "-1";

    if (moveToBack) {
      copy.push(cardToTransfer);
    } else {
      const insertAtIndex = copy.findIndex((el) => el.id === before);
      if (insertAtIndex === undefined) return;

      copy.splice(insertAtIndex, 0, cardToTransfer);
    }

    setTrees(copy);
  }
};

export const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  highlightIndicator(e);
};

const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
  const indicators = getIndicators();
  clearHighlights(indicators);
  const el = getNearestIndicator(e, indicators);
  el.element.style.opacity = "1";
};

export const clearHighlights = (els?: HTMLElement[]) => {
  const indicators = els || getIndicators();

  indicators.forEach((element) => {
    element.style.opacity = "0";
  });
};

const getNearestIndicator = (e: DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
  const DISTANCE_OFFSET = 100;

  const el = indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientX - (box.left + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );

  return el;
};

const getIndicators = () => {
  return Array.from(document.querySelectorAll('[data-column="0"]')) as HTMLElement[];
};
