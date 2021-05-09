import { Command, option, Option } from 'commander';
import { Transform, Readable } from 'stream';
import { TransformCallback } from 'stream';
import fs from 'fs';
import { caesarCipher } from './services/caesarCipher';
import { verifyShift } from './services/verifyShift';
import { actions } from './constants/actions';

class CaesarCipherTransform extends Transform {
  _transform(buffer: Buffer, encoding: BufferEncoding, cb: TransformCallback) {
    try {
      const transformedText: string = caesarCipher(buffer.toString(), options.shift, options.action);
      cb(null, transformedText);
    } catch (err) {
      cb(err);
    }
  }
}

const transformInput = new CaesarCipherTransform();


const program = new Command();

program
  .requiredOption('-s, --shift <shift>', 'shift', verifyShift)
  .option('-i, --input <input>', 'input file')
  .option('-o, --output <output>', 'output file')
  .addOption(new Option('-a, --action <action>', 'action').choices(actions))
  .parse();

const options = program.opts();


if (!options.action) {
  process.stderr.write(`Error: you must specify action: ${actions.toString()} \n\n`);
  process.exit(9);
}

// input/output files not specified
if (!options.input && !options.output) {
  console.log(`Enter text to ${options.action}:`);
  process.stdin.pipe(transformInput).pipe(process.stdout);
}

// only output file specified
if (!options.input && options.output) {
  const writeFileStream = fs.createWriteStream(`${__dirname}/files/${options.output}`, { flags: 'a' });

  console.log(`Enter text to ${options.action}:`);
  process.stdin.pipe(transformInput).pipe(writeFileStream);
}

// only input file specified
if (options.input && !options.output) {
  const readFileStream = fs.createReadStream(`${__dirname}/files/${options.input}`);

  readFileStream.on('error', function (err) {
    process.stderr.write(`${err.message} \n\n`);
    process.exit(9);
  });

  readFileStream.pipe(transformInput).pipe(process.stdout);
}

// input and output files specified
if (options.input && options.output) {
  const readFileStream = fs.createReadStream(`${__dirname}/files/${options.input}`);
  const writeFileStream = fs.createWriteStream(`${__dirname}/files/${options.output}`, { flags: 'a' });

  readFileStream.on('error', function (err) {
    process.stderr.write(`${err.message} \n\n`);
    process.exit(9);
  });

  writeFileStream.on('error', function (err) {
    process.stderr.write(`${err.message} \n\n`);
    process.exit(9);
  });

  readFileStream.pipe(transformInput).pipe(writeFileStream);
}
