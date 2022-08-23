import { setupField } from '../../../store/fieldSlice';
import { renderWithProviders } from '../../../utils/test-utils';
import { act, screen } from '@testing-library/react';
import CellsCounter from '../CellsCounter';

describe('CellsCounter', () => {
  it('should render CellsCounter', () => {
    const { container } = renderWithProviders(<CellsCounter />);
    expect(container).toMatchSnapshot();
  });

  it('should render exact number of opened and remaining cells', () => {
    const { store } = renderWithProviders(<CellsCounter />);
    act(() => {
      store.dispatch(
        setupField({
          size: { width: 3, height: 3 },
          holesCount: 1,
        })
      );
    });

    expect(screen.getByText(/8 \/ 8/)).toBeInTheDocument();
  });
});
