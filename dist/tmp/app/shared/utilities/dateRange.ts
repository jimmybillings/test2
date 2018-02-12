// Currently, this stuff is used only by FilterComponent, but it can be genericized if needed.
import { Common } from './common.functions';
export type DateRangeKey = 'start' | 'end';

export class DateRange {
  public start: string = null;
  public end: string = null;

  private readonly beginningOfTime: string = '1000-01-01';
  private readonly endOfTime: string = '3000-01-01';
  private readonly delimiter: string = ' - ';

  public get(key: DateRangeKey): string {
    switch (key) {
      case 'start': return this.start;
      case 'end': return this.end;
      default: throw new TypeError(`Invalid date range key '${key}'`);
    }
  }

  // "value" can be a string date (any format parseable by Date object's constructor)
  // or a string range of dates ("<date> - <date>").
  // Either way, only the part of the range specified by "key" will be set.
  public set(key: DateRangeKey, value: string): void {
    if (value && value.indexOf(this.delimiter) !== -1) {
      const [start, end]: string[] = value.split(this.delimiter);
      this.set(key, key === 'start' ? start : end);
      return;
    }

    switch (key) {
      case 'start':
        this.start =
          value === this.beginningOfTime ? null : this.format(value);
        break;
      case 'end':
        this.end =
          value === this.endOfTime ? null : this.format(value);
        break;
      default:
        throw new TypeError(`Invalid date range key '${key}'`);
    }
  }

  public toString(): string {
    const start: string =
      this.start ? this.format(this.start) : this.beginningOfTime;

    const end: string =
      this.end ? this.format(this.end) : this.endOfTime;

    return `${start}${this.delimiter}${end}`;
  }

  public toHumanString(): string {
    if (this.start && this.end) {
      return `${this.humanFormat(this.start)}${this.delimiter}${this.humanFormat(this.end)}`;
    }

    if (!this.start && !this.end) {
      return 'Any date';
    }

    if (!this.start) {
      return `On or before ${this.humanFormat(this.end)}`;
    }

    return `On or after ${this.humanFormat(this.start)}`;
  }

  private format(date: any): string {
    return new Date(date).toJSON().slice(0, 10);
  }

  private humanFormat(date: any) {
    const value = Common.convertToDateInstance(date);
    return value.getMonth() + 1 + '/' + value.getDate() + '/' + value.getFullYear();
  }
}
