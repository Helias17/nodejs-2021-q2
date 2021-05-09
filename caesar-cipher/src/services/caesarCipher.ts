import { ENG_ALPHABET } from '../constants/alphabet';
import { isLowerCase } from './isLowerCase';

export const caesarCipher = (text: string, shift: number, action: 'encode' | 'decode'): string => {
  const alphabetLength = ENG_ALPHABET.length;
  shift = Math.abs(shift) > alphabetLength ? (shift % alphabetLength) : shift;
  if (action === 'decode') {
    shift = shift * (-1);
  }

  const inputTextArr = text.split('');

  const encodedTextArr = inputTextArr.map((letter) => {
    const isLetterInLowerCase = isLowerCase(letter);
    const letterNumInAlphabet = ENG_ALPHABET.indexOf(letter.toLowerCase());

    if (letterNumInAlphabet >= 0) {
      let encodedLetterNumInAlphabet = shift + letterNumInAlphabet;

      if (encodedLetterNumInAlphabet > alphabetLength - 1) {
        encodedLetterNumInAlphabet = encodedLetterNumInAlphabet - alphabetLength;
      }
      if (encodedLetterNumInAlphabet < 0) {
        encodedLetterNumInAlphabet = alphabetLength + encodedLetterNumInAlphabet;
      }

      const encodedLetter = ENG_ALPHABET[encodedLetterNumInAlphabet];
      return isLetterInLowerCase ? encodedLetter.toLowerCase() : encodedLetter.toUpperCase();
    }
    return letter;
  })

  return encodedTextArr.join('');
}
