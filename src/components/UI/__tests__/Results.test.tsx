import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import Results from '../Results';
import {
  DIFFUCULTY,
  registerDifficulty,
  updateTime,
  winGame,
} from '../../../store/gameSlice';
import { setupStore } from '../../../store';

describe('Results', () => {
  it('should render Results', () => {
    const { container } = renderWithProviders(<Results />);
    expect(container).toMatchSnapshot();
  });

  it('should render exact difficulty', () => {
    const store = setupStore();
    store.dispatch(registerDifficulty(DIFFUCULTY.MEDIUM));

    renderWithProviders(<Results />, { store });

    expect(screen.getByText(/(medium mode)/i)).toBeInTheDocument();
  });

  it('should render exact time', () => {
    const store = setupStore();
    store.dispatch(updateTime());
    store.dispatch(updateTime());

    renderWithProviders(<Results />, { store });

    expect(screen.getByText(/00:02/i)).toBeInTheDocument();
  });

  it('should render win greetings text', () => {
    const store = setupStore();
    store.dispatch(updateTime());
    store.dispatch(updateTime());

    renderWithProviders(<Results />, { store });

    expect(screen.getByText(/you win!/i)).toBeInTheDocument();
  });

  it('should render new score greetings text', () => {
    const store = setupStore();
    store.dispatch(updateTime());
    store.dispatch(updateTime());
    store.dispatch(winGame());

    renderWithProviders(<Results />, { store });

    expect(screen.getByText(/New high score!/i)).toBeInTheDocument();
  });
});
