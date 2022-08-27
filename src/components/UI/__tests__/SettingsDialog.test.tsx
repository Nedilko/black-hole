import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils';
import SettingsDialog from '../SettingsDialog';
import { fireEvent, screen } from '@testing-library/react';
import * as actions from '../../../store/gameSlice';
import * as hooks from '../../../hooks';
import { DIFFUCULTY } from '../../../utils/game';

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useAppDispatch: jest.fn(),
}));
jest.mock('../../../hooks');

const registerDifficultyAction = jest.spyOn(actions, 'registerDifficulty');
const startGameAction = jest.spyOn(actions, 'startGame');

describe('SettingsDialog', () => {
  afterEach(() => {
    jest.clearAllMocks();
    registerDifficultyAction.mockReset();
    startGameAction.mockReset();
  });

  it('should render', () => {
    const { container } = renderWithProviders(<SettingsDialog />);
    expect(container).toMatchSnapshot();
  });

  it('should handle start button click', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    renderWithProviders(<SettingsDialog />);

    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledTimes(1);
    expect(registerDifficultyAction).toHaveBeenCalledTimes(1);
  });

  it('should handle difficulty change', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    renderWithProviders(<SettingsDialog />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Medium');
    userEvent.click(screen.getByRole('button'));

    expect(registerDifficultyAction).toHaveBeenCalledWith(DIFFUCULTY.MEDIUM);
  });

  it('shouldn handle inputs change if diffuculty selected', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    renderWithProviders(<SettingsDialog />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Medium');
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 15, height: 15 }, 20);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Hard');
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 20, height: 20 }, 30);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Hard');
    userEvent.selectOptions(screen.getByRole('combobox'), 'Easy');
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 8, height: 8 }, 10);
  });

  it("shouldn't handle inputs change if diffuculty set to custom", () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    renderWithProviders(<SettingsDialog />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Custom');
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 8, height: 8 }, 10);
  });

  it('should handle width, height, holes count change', () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    renderWithProviders(<SettingsDialog />);

    fireEvent.change(screen.getByLabelText(/width/i), {
      target: { value: '12' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '13' },
    });
    fireEvent.change(screen.getByLabelText(/holes count/i), {
      target: { value: '14' },
    });
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 12, height: 13 }, 14);
  });

  it("shouldn't change width if width and height less than 5", () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());

    renderWithProviders(<SettingsDialog />);

    fireEvent.change(screen.getByLabelText(/width/i), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '4' },
    });
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 8, height: 8 }, 10);
  });

  it("shouldn't change width if width and height greater than 20", () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());

    renderWithProviders(<SettingsDialog />);

    fireEvent.change(screen.getByLabelText(/width/i), {
      target: { value: '21' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '21' },
    });
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width: 8, height: 8 }, 10);
  });

  it("shouldn't change holes count if it greater than width * height - 1", () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    const width = 8;
    const height = 8;

    renderWithProviders(<SettingsDialog />);

    fireEvent.change(screen.getByLabelText(/holes count/i), {
      target: { value: width * height - 1 },
    });
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width, height }, 10);
  });

  it("shouldn't change holes count if it less than 1", () => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn());
    const width = 8;
    const height = 8;

    renderWithProviders(<SettingsDialog />);

    fireEvent.change(screen.getByLabelText(/holes count/i), {
      target: { value: 0 },
    });
    userEvent.click(screen.getByRole('button'));

    expect(startGameAction).toHaveBeenCalledWith({ width, height }, 10);
  });
});
