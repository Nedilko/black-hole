import { FC, useCallback } from 'react';
import { useAppDispatch } from '../../store';
import { fieldActions, openCell } from '../../store/actions/field';

export interface WithInteractivityProps {
  handleOpen: (index: number) => void;
  handleMarkCell: (index: number) => void;
}

const withInterctivity = <
  T extends WithInteractivityProps = WithInteractivityProps
>(
  WrappedComponent: FC<T>
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

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
        dispatch(fieldActions.toggleMarkCell(cellIndex));
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

  WithInteractivity.displayName = `WithInteractivity(${displayName})`;

  return WithInteractivity;
};

export default withInterctivity;
