import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils';
import NumberInput from '../NumberInput';

describe('NumberInput', () => {
  const changeHandler = jest.fn();

  beforeEach(() => {
    changeHandler.mockClear();
  });

  it('should render NumberInput', () => {
    const { container } = renderWithProviders(
      <NumberInput
        label={''}
        min={0}
        max={0}
        value={0}
        handleChange={changeHandler}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should handle change', () => {
    renderWithProviders(
      <NumberInput
        label={'sample'}
        min={0}
        max={20}
        value={5}
        handleChange={changeHandler}
      />
    );

    fireEvent.change(screen.getByLabelText(/sample/i), {
      target: { value: '6' },
    });
    fireEvent.change(screen.getByLabelText(/sample/i), {
      target: { value: '7' },
    });
    expect(changeHandler).toHaveBeenCalledTimes(2);
  });

  it('should handle click increment button', () => {
    renderWithProviders(
      <NumberInput
        label={'sample'}
        min={0}
        max={20}
        value={5}
        handleChange={changeHandler}
      />
    );

    userEvent.click(screen.getByTestId(/increment/i));
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(6);
  });

  it('should handle click decrement button', () => {
    renderWithProviders(
      <NumberInput
        label={'sample'}
        min={0}
        max={20}
        value={5}
        handleChange={changeHandler}
      />
    );

    userEvent.click(screen.getByTestId(/decrement/i));
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(4);
  });

  it('should prevent scrolling', () => {
    renderWithProviders(
      <NumberInput
        label={'sample'}
        min={0}
        max={20}
        value={5}
        handleChange={changeHandler}
      />
    );

    fireEvent.wheel(screen.getByLabelText(/sample/i), {
      deltaY: -1,
    });
    expect(changeHandler).not.toHaveBeenCalled();
  });
});
