import { useEffect, useState, useCallback } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';

const getColumnWidth = (dimension: EDimensions): number =>
  ({
    [EDimensions.DESKTOP]: 356,
    [EDimensions.LAPTOP]: 316,
    [EDimensions.MEDIUM]: 276,
    [EDimensions.SMALL]: 181,
    [EDimensions.UNKNOWN]: 356,
  }[dimension]);

const getRowHeight = (dimension: EDimensions): number =>
  ({
    [EDimensions.DESKTOP]: 506,
    [EDimensions.LAPTOP]: 448,
    [EDimensions.MEDIUM]: 418,
    [EDimensions.SMALL]: 181,
    [EDimensions.UNKNOWN]: 506,
  }[dimension]);

export const getCellGap = (dimension: EDimensions): number =>
  ({
    [EDimensions.DESKTOP]: 23,
    [EDimensions.LAPTOP]: 20,
    [EDimensions.MEDIUM]: 18,
    [EDimensions.SMALL]: 10,
    [EDimensions.UNKNOWN]: 23,
  }[dimension]);

const getOverScanRow = (dimension: EDimensions): number =>
  ({
    [EDimensions.DESKTOP]: 2,
    [EDimensions.LAPTOP]: 2,
    [EDimensions.MEDIUM]: 3,
    [EDimensions.SMALL]: 7,
    [EDimensions.UNKNOWN]: 2,
  }[dimension]);

const INITIAL_COLUMN_COUNT = 3;

export const useProjectsGrid = () => {
  const dimension = useWindowDimensions();

  const [gridRef, setGridRef] = useState<{ current: Grid | null }>({
    current: null,
  });
  const handleGridRefRef = useCallback((node: Grid) => {
    setGridRef({ current: node });
  }, []);

  const [gridOuterRef, setGridOuterRef] = useState<{
    current: HTMLDivElement | null;
  }>({ current: null });
  const handleGridOuterRef = useCallback((node: HTMLDivElement) => {
    setGridOuterRef({ current: node });
  }, []);

  const [width, setWidth] = useState<number>(0);
  const [columnCount, setColumnCount] = useState<number>(INITIAL_COLUMN_COUNT);

  useEffect(() => {
    let observer: ResizeObserver | null = null;
    if (gridOuterRef?.current) {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setWidth(entry.contentRect.width);
        }
      });
      observer.observe(gridOuterRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [gridOuterRef]);

  useEffect(() => {
    setColumnCount(
      Math.floor(
        (width + 5) / (getColumnWidth(dimension) + getCellGap(dimension))
      ) || INITIAL_COLUMN_COUNT
    );
  }, [width, dimension]);

  useEffect(() => {
    gridRef?.current?.resetAfterIndices?.({ columnIndex: 0, rowIndex: 0 });
  }, [gridRef, columnCount, dimension]);

  return {
    columnWidth: getColumnWidth(dimension),
    columnCount,
    rowHeight: getRowHeight(dimension),
    cellGap: getCellGap(dimension),
    gridRef,
    overScanRow: getOverScanRow(dimension),
    setGridRef: handleGridRefRef,
    setGridOuterRef: handleGridOuterRef,
  };
};
