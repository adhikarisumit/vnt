import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits a string into animation units: one unit per CJK character, one per
 * Latin word. Trailing punctuation rides along with the character before it so
 * a line never starts with 、。」 and friends (禁則処理).
 */
export function splitForStagger(text: string): string[] {
  const cjk = '\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}ーｰ々〆';
  const noLineStart = '、。，．・：；！？）」』】〉》”’ぁぃぅぇぉっゃゅょァィゥェォッャュョ';
  const pattern = new RegExp(`[${cjk}][${noLineStart}]*|\\S+|\\s+`, 'gu');
  return text.match(pattern) ?? [text];
}
