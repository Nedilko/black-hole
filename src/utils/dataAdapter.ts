import type { Results } from '../store/gameSlice';
import { getDefaultResults } from './game';
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from './localstorageAdapter';

const loadResults = (): Results => {
  const localStorageData = readFromLocalstorage('results');
  if (!localStorageData) {
    writeResults(getDefaultResults());
    return getDefaultResults();
  }
  return JSON.parse(atob(localStorageData));
};

const writeResults = (settings: Results): void => {
  writeToLocalstorage('results', btoa(JSON.stringify(settings)));
};

export { loadResults, writeResults };
