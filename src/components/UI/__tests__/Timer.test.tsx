import { setupStore } from '../../../store';
import { updateTime } from '../../../store/gameSlice';
import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import Timer from '../Timer';

it('should render Timer', () => {
  const { container } = renderWithProviders(<Timer />);
  expect(container).toMatchSnapshot();
});

it('should change timer text', () => {
  const store = setupStore();
  store.dispatch(updateTime());
  store.dispatch(updateTime());

  renderWithProviders(<Timer />, { store });

  expect(screen.getByText(/00:02/)).toBeInTheDocument();
});
