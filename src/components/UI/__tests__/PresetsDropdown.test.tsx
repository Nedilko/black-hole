import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import PresetsDropdown from '../PresetsDropdown';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockClear();
  });

  it('should render PresetsDropdown', () => {
    const { container } = renderWithProviders(
      <PresetsDropdown value={0} handleChange={handler} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with selected value', () => {
    renderWithProviders(<PresetsDropdown value={1} handleChange={handler} />);
    expect(
      (screen.getByTestId('presets-dropdown') as HTMLSelectElement).value
    ).toBe('1');
  });

  it('should call handler on change', () => {
    renderWithProviders(<PresetsDropdown value={0} handleChange={handler} />);

    userEvent.selectOptions(screen.getByTestId('presets-dropdown'), '2');

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(2);
  });
});
