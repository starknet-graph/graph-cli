import { Contract } from '../contract';

export default class StarknetContract implements Contract {
  static identifierName() {
    return 'address';
  }

  constructor(private address: string) {
    this.address = address;
  }

  validate() {
    const pattern = /^(0x)?[0-9a-fA-F]{1,64}$/;

    const errorMessage = "Must be up to 64 hexadecimal characters, with an optional '0x' prefix.";

    const valid = pattern.test(this.address);

    return {
      valid,
      error: valid ? null : errorMessage,
    };
  }
}
