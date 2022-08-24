import type { Results } from '../../store/gameSlice';
import { loadResults, writeResults } from '../dataAdapter';
import {
  writeToLocalstorage,
  readFromLocalstorage,
} from '../localstorageAdapter';

jest.mock('../localstorageAdapter');

describe('dataAdapter', () => {
  const handler = jest.fn();
  const mockedWriteToLocalstorage = jest.mocked(writeToLocalstorage);
  const mockedReadFromLocalstorage = jest.mocked(readFromLocalstorage);

  beforeEach(() => {
    mockedWriteToLocalstorage.mockImplementation(() => handler);
    mockedReadFromLocalstorage.mockImplementation(() =>
      btoa(
        JSON.stringify({
          '0': 0,
          '1': 1,
          '2': 2,
          '3': 3,
        })
      )
    );
  });

  afterEach(() => {
    handler.mockClear();
    mockedWriteToLocalstorage.mockClear();
    mockedReadFromLocalstorage.mockClear();
  });

  it('should write settings', () => {
    const data: Results = {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
    };
    writeResults(data);
    expect(mockedWriteToLocalstorage).toHaveBeenCalledTimes(1);
  });

  it('should load settings', () => {
    const settings = loadResults();
    expect(settings).toMatchObject({
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
    });
    expect(mockedWriteToLocalstorage).not.toHaveBeenCalled();
    expect(mockedReadFromLocalstorage).toHaveBeenCalledTimes(1);
  });

  it('should load non existing settings', () => {
    mockedReadFromLocalstorage.mockImplementation(() => undefined);
    const settings = loadResults();
    expect(settings).toMatchObject({
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
    });
    expect(mockedWriteToLocalstorage).toHaveBeenCalledTimes(1);
    expect(mockedReadFromLocalstorage).toHaveBeenCalledTimes(1);
  });
});
