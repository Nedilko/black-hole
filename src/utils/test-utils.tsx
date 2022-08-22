import { RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PreloadedState } from 'redux';
import { AppStore, RootState, setupStore } from '../store';
import { render } from '@testing-library/react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    initialState = {},
    store = setupStore(initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
