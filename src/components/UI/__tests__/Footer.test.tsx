import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('should render Footer', () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('should render exact text', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/contact me/)).toBeInTheDocument();
  });

  it('should correct mailto attribute', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/contact me/)).toHaveAttribute(
      'href',
      'mailto:alexandr.nedilko@gmail.com'
    );
  });
});
