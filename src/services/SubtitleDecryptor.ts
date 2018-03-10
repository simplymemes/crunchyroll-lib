import { ISubtitleDecryptor } from "../models/ISubtitleDecryptor";
import { TextEncoder } from 'text-encoding';
import { SHA1 } from '../utils/hash/sha1';
import { hexStringToByte } from '../utils/string';
import * as bigInt from 'big-integer';
import * as aes from 'aes-js';
import * as pako from 'pako';

export class SubtitleDecryptor implements ISubtitleDecryptor {
  /**
   * The id of the subtitle, also what the decryption key is derived from.
   */
  public id: number;

  /**
   * The initial vector.
   */
  public iv: Uint8Array;

  /**
   * The encrypted data.
   */
  public data: Uint8Array;

  constructor(id: number, iv: Uint8Array, data: Uint8Array) {
    this.id = id;
    this.iv = iv;
    this.data = data;
  }

  getAuxKey(count: number, modulo: number, start: number[]): Uint8Array {
    let output: number[] = start.slice(0);
    for (let i = 0; i < count; i++) {
      output.push(output[output.length - 1] + output[output.length - 2]);
    }
    output = output.slice(2);
    return new Uint8Array(output.map(x => x % modulo + 33));
  }

  /**
   * Returns the key that's derived from the ID.
   */
  getKey(): Uint8Array {
    const key = bigInt(this.id);
    const num1 = bigInt(Math.floor(Math.pow(2, 25) * Math.sqrt(6.9)));
    const num2 = num1.xor(key).shiftLeft(5);
    const num3 = key.xor(num1);
    const num4 = num3.xor(num3.shiftRight(3)).xor(num2);

    const keyAux = this.getAuxKey(20, 97, [1, 2]);
    const num4Arr = new TextEncoder("ascii").encode(num4.toString());
    const shaData = new Uint8Array(keyAux.length + num4Arr.length);
    shaData.set(keyAux);
    shaData.set(num4Arr, keyAux.length);

    const sha1 = new SHA1();
    sha1.update(shaData);

    const shaHash = hexStringToByte(sha1.digest());

    const emptyArray = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const result = new Uint8Array(shaHash.length + emptyArray.length);
    result.set(shaHash);
    result.set(emptyArray, shaHash.length);

    return result;
  }

  /**
   * Returns the decrypted data.
   */
  decrypt(): Uint8Array {
    const aesCbc = new aes.ModeOfOperation.cbc(this.getKey(), this.iv);
    const decryptedData = aesCbc.decrypt(this.data);

    return pako.inflate(decryptedData);
  }
}