import { FC, useCallback } from 'react';
import { useAppDispatch } from '../../../hooks';
import { toggleMarkCell, openCell } from '../../../store/fieldSlice';
import type { WithInteractivityProps } from './index';

const withInterctivity = <
  T extends WithInteractivityProps = WithInteractivityProps
>(
  WrappedComponent: FC<T>
) => {
  const WithInteractivity = (props: Omit<T, keyof WithInteractivityProps>) => {
    const dispatch = useAppDispatch();
    const handleOpenCell = useCallback(
      (cellIndex: number) => {
        dispatch(openCell(cellIndex));
      },
      [dispatch]
    );

    const handleMarkCell = useCallback(
      (cellIndex: number) => {
        dispatch(toggleMarkCell(cellIndex));
      },
      [dispatch]
    );

    return (
      <WrappedComponent
        {...(props as T)}
        handleOpen={handleOpenCell}
        handleMarkCell={handleMarkCell}
      />
    );
  };

  WithInteractivity.displayName = `WithInteractivity`;

  return WithInteractivity;
};

export default withInterctivity;
