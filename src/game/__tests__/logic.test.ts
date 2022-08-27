import { getHolesIndexes, getCellSurroundingIndexes } from '../logic';

describe('getHolesIndexes', () => {
  it('should return array of length equal to holes count', () => {
    const size = { width: 10, height: 10 };
    const holesCount = 3;
    const result = getHolesIndexes(size, holesCount);
    expect(result).toHaveLength(holesCount);
  });

  it('should return array with numbers more than 0 and less than width * height', () => {
    const size = { width: 10, height: 10 };
    const holesCount = 3;
    const result = getHolesIndexes(size, holesCount);
    result.some((el) => expect(el).toBeLessThan(size.width * size.height));
    result.some((el) => expect(el).toBeGreaterThanOrEqual(0));
  });

  it('should return different results', () => {
    const size = { width: 10, height: 10 };
    const holesCount = 3;
    const result1 = getHolesIndexes(size, holesCount);
    const result2 = getHolesIndexes(size, holesCount);
    expect(result1).not.toEqual(result2);
  });
});

describe('getCellSurroundingIndexes', () => {
  it('should return exact surrounding cells count', () => {
    const size = { width: 3, height: 3 };
    expect(getCellSurroundingIndexes({ x: 0, y: 0 }, size)).toHaveLength(3);
    expect(getCellSurroundingIndexes({ x: 1, y: 0 }, size)).toHaveLength(5);
    expect(getCellSurroundingIndexes({ x: 2, y: 0 }, size)).toHaveLength(3);
    expect(getCellSurroundingIndexes({ x: 0, y: 1 }, size)).toHaveLength(5);
    expect(getCellSurroundingIndexes({ x: 1, y: 1 }, size)).toHaveLength(8);
    expect(getCellSurroundingIndexes({ x: 2, y: 1 }, size)).toHaveLength(5);
    expect(getCellSurroundingIndexes({ x: 0, y: 2 }, size)).toHaveLength(3);
    expect(getCellSurroundingIndexes({ x: 1, y: 2 }, size)).toHaveLength(5);
    expect(getCellSurroundingIndexes({ x: 2, y: 2 }, size)).toHaveLength(3);
  });

  it('should return exact surrounding cells indexes', () => {
    const size = { width: 3, height: 3 };
    expect(getCellSurroundingIndexes({ x: 0, y: 0 }, size)).toEqual([3, 1, 4]);
    expect(getCellSurroundingIndexes({ x: 1, y: 0 }, size)).toEqual([
      0, 3, 4, 2, 5,
    ]);
    expect(getCellSurroundingIndexes({ x: 2, y: 0 }, size)).toEqual([1, 4, 5]);
    expect(getCellSurroundingIndexes({ x: 0, y: 1 }, size)).toEqual([
      0, 6, 1, 4, 7,
    ]);
    expect(getCellSurroundingIndexes({ x: 1, y: 1 }, size)).toEqual([
      0, 3, 6, 1, 7, 2, 5, 8,
    ]);
    expect(getCellSurroundingIndexes({ x: 2, y: 1 }, size)).toEqual([
      1, 4, 7, 2, 8,
    ]);
    expect(getCellSurroundingIndexes({ x: 0, y: 2 }, size)).toEqual([3, 4, 7]);
    expect(getCellSurroundingIndexes({ x: 1, y: 2 }, size)).toEqual([
      3, 6, 4, 5, 8,
    ]);
    expect(getCellSurroundingIndexes({ x: 2, y: 2 }, size)).toEqual([4, 7, 5]);
  });
});
