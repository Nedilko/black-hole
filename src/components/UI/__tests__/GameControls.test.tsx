import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import GameControls from '../GameControls';
import { act } from 'react-dom/test-utils';
import {
  finishGame,
  GameState,
  restartGame,
  showGameField,
  startGame,
} from '../../../store/gameSlice';
import gameReducer from '../../../store/gameSlice';
import type { AppDispatch, RootState } from '../../../store/';
import { renewField } from '../../../store/fieldSlice';
import userEvent from '@testing-library/user-event';
import * as hooks from '../../../hooks';
import * as actions from '../../../store/gameSlice';

jest.mock('../../../hooks');

describe('GameControls', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render GameControls', () => {
    const { container } = renderWithProviders(<GameControls />);
    expect(container).toMatchSnapshot();
  });

  it('should render game controls buttons', () => {
    renderWithProviders(<GameControls />);
    expect(screen.getByText(/try again/)).toBeInTheDocument();
    expect(screen.getByText(/main menu/)).toBeInTheDocument();
  });

  it('should call restart game action', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());

    renderWithProviders(<GameControls />);

    const restartAction = jest.spyOn(actions, 'restartGame');

    userEvent.click(screen.getByText(/try again/));

    expect(restartAction).toHaveBeenCalledTimes(1);
  });

  it('should call show main menu action', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());

    renderWithProviders(<GameControls />);

    const showMainMenuAction = jest.spyOn(actions, 'showMainMenu');

    userEvent.click(screen.getByText(/main menu/));

    expect(showMainMenuAction).toHaveBeenCalledTimes(1);
  });

  it.skip('should dispatch restart game inner dispatches', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    const disp = jest.fn();
    const thunk = restartGame();
    thunk(disp);
    renderWithProviders(<GameControls />);

    userEvent.click(screen.getByText(/try again/));

    expect(disp).toHaveBeenCalledTimes(2);
    expect(disp).toHaveBeenCalledWith(renewField());
    expect(disp).toHaveBeenCalledWith(showGameField());
  });
});
