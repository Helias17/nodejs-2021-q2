import { ENG_ALPHABET } from '../constants/alphabet';
import { isLowerCase } from './isLowerCase';

export const caesarCipher = (text: string, shift: number, action: 'encode' | 'decode'): string => {
  const alphabetLength = ENG_ALPHABET.length;
  console.log('alphabetLength', alphabetLength);
  shift = Math.abs(shift) > alphabetLength ? (shift % alphabetLength) : shift;
  if (action === 'decode') {
    shift = shift * (-1);
  }

  const inputTextArr = text.split('');

  const encodedTextArr = inputTextArr.map((letter) => {
    const isLetterInLowerCase = isLowerCase(letter);
    console.log('isLetterInLowerCase', isLetterInLowerCase);

    const letterNumInAlphabet = ENG_ALPHABET.indexOf(letter.toLowerCase());
    console.log('letterNumInAlphabet', letterNumInAlphabet);

    if (letterNumInAlphabet >= 0) {
      let encodedLetterNumInAlphabet = shift + letterNumInAlphabet;
      console.log('encodedLetterNumInAlphabet', encodedLetterNumInAlphabet);
      if (encodedLetterNumInAlphabet > alphabetLength - 1) {
        encodedLetterNumInAlphabet = encodedLetterNumInAlphabet - alphabetLength;
      }
      if (encodedLetterNumInAlphabet < 0) {
        encodedLetterNumInAlphabet = alphabetLength + encodedLetterNumInAlphabet;
      }

      console.log('encodedLetterNumInAlphabet', encodedLetterNumInAlphabet);
      const encodedLetter = ENG_ALPHABET[encodedLetterNumInAlphabet];
      console.log(encodedLetter);
      return isLetterInLowerCase ? encodedLetter.toLowerCase() : encodedLetter.toUpperCase();
    }
    return letter;
  })

  console.log(encodedTextArr.join(''));
  return encodedTextArr.join('');
}
