import { describe, expect, it } from 'vitest';
import { availableSlots, durationMinutes } from './availability';
const hours = { days: ['ter'], start: '09:00', end: '12:00' };
const settings = { minAdvanceHours: 0, bufferMinutes: 0 } as Parameters<typeof availableSlots>[3];
const now = new Date('2026-10-05T12:00:00');
describe('availability', () => {
  it('uses procedure duration and closing time', () => expect(availableSlots('2026-10-06', 70, hours, settings, [], now)).toEqual(['09:00', '10:10']));
  it('blocks whole dates', () => expect(availableSlots('2026-10-06', 30, {...hours, blockedDates: ['2026-10-06']}, settings, [], now)).toEqual([]));
  it('honors day overrides and occupied intervals', () => expect(availableSlots('2026-10-06', 30, {...hours, overrides: {ter: {start:'10:00',end:'11:00'}}}, settings, [{date:'2026-10-06', time:'10:00',durationMinutes:45,type:'client'}], now)).toEqual([]));
  it('parses hours and minutes', () => expect(durationMinutes('1h 30 min')).toBe(90));
});