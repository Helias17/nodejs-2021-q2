import { Command, option, Option, CommanderError } from 'commander';
import { Transform } from 'stream';
import { TransformCallback } from 'stream';
import { caesarCipher } from './services/caesarCipher';


class CaesarCipherTransform extends Transform {
  _transform(buffer: Buffer, encoding: BufferEncoding, cb: TransformCallback) {
    try {
      const transformedText: string = caesarCipher(buffer.toString(), options.shift, 'encode');
      cb(null, transformedText);
    } catch (err) {
      cb(err);
    }
  }
}

const transformInput = new CaesarCipherTransform();

const program = new Command();

const myParseInt = (value: string): number => {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new CommanderError(0, '400', 'Not a number.');
  }
  return parsedValue;
}

program
  .requiredOption('-s, --shift <shift>', 'shift', myParseInt)
  .option('-i, --input <input>', 'input file')
  .option('-o, --output <output>', 'output file')
  .addOption(new Option('-a, --action <action>', 'action').choices(['encode', 'decode']))
  .parse();

const options = program.opts();



if (!options.input && !options.output) {
  console.log(`Enter text to ${options.action}:`);
  process.stdin.pipe(transformInput).pipe(process.stdout);

}
