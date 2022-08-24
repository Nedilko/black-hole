import { setupStore } from '../../../store';
import { startGame } from '../../../store/gameSlice';
import { renderWithProviders } from '../../../utils/test-utils';
import GameField from '../GameField';
jest.mock('../Cell', () => () => <div>Cell</div>);

describe('GameField', () => {
  it('should render GameField with predefined width and height', () => {
    const store = setupStore();
    store.dispatch(startGame({ width: 10, height: 10 }, 1));
    const { container } = renderWithProviders(<GameField />, { store });
    expect(container).toMatchSnapshot();
  });
});
