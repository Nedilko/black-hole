import Cell from '..';
import { renderWithProviders } from '../../../../utils/test-utils';
import * as hooks from '../../../../hooks';
import * as actions from '../../../../store/fieldSlice';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';

describe('Cell', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Cell', () => {
    const { container } = renderWithProviders(
      <Cell
        index={0}
        isHole={false}
        isOpen={false}
        isMarked={false}
        holesNearCount={3}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render hole Cell', () => {
    const { container } = renderWithProviders(
      <Cell
        index={0}
        isHole={true}
        isOpen={false}
        isMarked={false}
        holesNearCount={3}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render open Cell', () => {
    const { container } = renderWithProviders(
      <Cell
        index={0}
        isHole={false}
        isOpen={true}
        isMarked={false}
        holesNearCount={3}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render marked Cell', () => {
    const { container } = renderWithProviders(
      <Cell
        index={0}
        isHole={false}
        isOpen={false}
        isMarked={true}
        holesNearCount={3}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render not empty Cell', () => {
    const { container } = renderWithProviders(
      <Cell
        index={0}
        isHole={false}
        isOpen={true}
        isMarked={false}
        holesNearCount={0}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should handle cell left click', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    const openCellAction = jest.spyOn(actions, 'openCell');

    renderWithProviders(
      <Cell
        index={2}
        isHole={false}
        isOpen={false}
        isMarked={false}
        holesNearCount={0}
      />
    );

    userEvent.click(screen.getByRole('button'));
    expect(openCellAction).toHaveBeenCalledTimes(1);
    expect(openCellAction).toHaveBeenCalledWith(2);
  });

  it('should handle cell right click', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    const toggleMarkCellAction = jest.spyOn(actions, 'toggleMarkCell');

    renderWithProviders(
      <Cell
        index={2}
        isHole={false}
        isOpen={false}
        isMarked={false}
        holesNearCount={0}
      />
    );

    fireEvent.contextMenu(screen.getByRole('button'));
    expect(toggleMarkCellAction).toHaveBeenCalledTimes(1);
    expect(toggleMarkCellAction).toHaveBeenCalledWith(2);
  });
});
