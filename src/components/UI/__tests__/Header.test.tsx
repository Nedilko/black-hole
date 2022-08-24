import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import Header from '../Header';
import { setupStore } from '../../../store';
import { startGame } from '../../../store/gameSlice';

jest.mock('../CellsCounter', () => () => <div>CellsCounter</div>);
jest.mock('../Timer', () => () => <div>Timer</div>);

describe('Header', () => {
  it('should render Header without Timer and CellsCounter', () => {
    renderWithProviders(<Header />);
    expect(screen.queryByText(/CellsCounter/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Timer/)).not.toBeInTheDocument();
  });

  it('should render Header with Timer and CellsCounter', () => {
    const store = setupStore();
    store.dispatch(startGame({ width: 10, height: 10 }, 1));
    const { container } = renderWithProviders(<Header />, { store });

    expect(screen.getByText(/CellsCounter/)).toBeInTheDocument();
    expect(screen.getByText(/Timer/)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
