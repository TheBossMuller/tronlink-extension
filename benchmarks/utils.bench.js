import { bench, describe } from 'vitest';
import Utils from '../packages/lib/utils.js';

describe('String conversion benchmarks', () => {
  bench('stringToByte - short string', () => {
    Utils.stringToByte('Hello World');
  });

  bench('stringToByte - long string', () => {
    Utils.stringToByte('Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10));
  });

  bench('byteToString - basic array', () => {
    const byteArray = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
    Utils.byteToString(byteArray);
  });

  bench('byteToString - large array', () => {
    const byteArray = Array.from({ length: 1000 }, (_, i) => (i % 128) + 32);
    Utils.byteToString(byteArray);
  });
});

describe('Hashing and encryption benchmarks', () => {
  const testData = { key: 'value', nested: { data: 'test' } };
  const testKey = 'test-key-12345';

  bench('hash - short string', () => {
    Utils.hash('short-test-string');
  });

  bench('hash - long string', () => {
    Utils.hash('This is a much longer string to test hashing performance. '.repeat(20));
  });

  bench('encrypt', () => {
    Utils.encrypt(testData, testKey);
  });

  bench('encrypt + decrypt', () => {
    const encrypted = Utils.encrypt(testData, testKey);
    Utils.decrypt(encrypted, testKey);
  });
});

describe('Mnemonic generation benchmarks', () => {
  bench('generateMnemonic', () => {
    Utils.generateMnemonic();
  });

  const sampleMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

  bench('validateMnemonic', () => {
    Utils.validateMnemonic(sampleMnemonic);
  });

  bench('getAccountAtIndex', () => {
    Utils.getAccountAtIndex(sampleMnemonic, 0);
  });
});

describe('Data processing benchmarks', () => {
  const testData = Array.from({ length: 100 }, (_, i) => ({
    tokenId: `token-${i}`,
    name: `Token ${String.fromCharCode(65 + (i % 26))}${i}`,
    abbr: String.fromCharCode(65 + (i % 26))
  }));

  bench('dataLetterSort - 100 items', () => {
    Utils.dataLetterSort(testData, 'name', 'abbr', []);
  });

  bench('dataLetterSort - with top array', () => {
    const topArray = [testData[0], testData[1], testData[2]];
    Utils.dataLetterSort(testData, 'name', 'abbr', topArray);
  });
});

describe('Validation benchmarks', () => {
  bench('validatInteger - valid', () => {
    Utils.validatInteger('12345');
  });

  bench('validatInteger - invalid', () => {
    Utils.validatInteger('abc123');
  });

  bench('timetransTime', () => {
    Utils.timetransTime(1609459200);
  });

  bench('timeFormatTime', () => {
    Utils.timeFormatTime(1609459200);
  });
});
