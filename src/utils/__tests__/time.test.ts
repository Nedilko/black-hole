import { getTime } from '../time';

describe('time', () => {
  it('should return time in format mm:ss', () => {
    expect(getTime(0)).toBe('00:00');
    expect(getTime(1)).toBe('00:01');
    expect(getTime(59)).toBe('00:59');
    expect(getTime(60)).toBe('01:00');
    expect(getTime(61)).toBe('01:01');
    expect(getTime(119)).toBe('01:59');
    expect(getTime(120)).toBe('02:00');
    expect(getTime(121)).toBe('02:01');
    expect(getTime(1199)).toBe('19:59');
    expect(getTime(1200)).toBe('20:00');
    expect(getTime(1201)).toBe('20:01');
    expect(getTime(3599)).toBe('59:59');
    expect(getTime(5999)).toBe('99:59');
    expect(getTime(6000)).toBe('100:00');
  });
});
