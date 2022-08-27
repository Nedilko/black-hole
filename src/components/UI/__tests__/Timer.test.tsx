import { setupStore } from '../../../store';
import * as actions from '../../../store/gameSlice';
import { renderWithProviders } from '../../../utils/test-utils';
import { act, screen } from '@testing-library/react';
import Timer from '../Timer';

describe('Timer', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should render Timer', () => {
    const { container } = renderWithProviders(<Timer />);
    expect(container).toMatchSnapshot();
  });

  it('should change timer text', () => {
    const store = setupStore();
    store.dispatch(actions.updateTime());
    store.dispatch(actions.updateTime());

    renderWithProviders(<Timer />, { store });

    expect(screen.getByText(/00:02/)).toBeInTheDocument();
  });

  it('should update time', () => {
    jest.useFakeTimers();

    const store = setupStore();
    store.dispatch(actions.startCountdown());

    renderWithProviders(<Timer />, { store });

    const updateTimeAction = jest.spyOn(actions, 'updateTime');

    act(() => {
      jest.runOnlyPendingTimers();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(updateTimeAction).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
    updateTimeAction.mockRestore();
  });
});
