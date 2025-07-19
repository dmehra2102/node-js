import { Chance } from "chance";
import { Readable, ReadableOptions } from "node:stream";

const chance = new Chance();

export class RandomString extends Readable {
  emittedBytes: number;
  constructor(options: ReadableOptions) {
    super(options);
    this.emittedBytes = 0;
  }

  _read(size: number): void {
    const chunk = chance.string({ length: size });
    this.push(chunk, "utf8");
    this.emittedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}
