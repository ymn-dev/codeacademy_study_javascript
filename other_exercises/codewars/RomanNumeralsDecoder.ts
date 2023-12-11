export function RomanNumeralsDecoder(roman: string): number {
  // complete the solution by transforming the
  // string roman numeral into an integer
  type RomanNumber = "I" | "V" | "X" | "L" | "C" | "D" | "M";

  const romanToArabic: Record<RomanNumber, number> = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };

  let arabicNum: number = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = roman[i];
    const next = i + 1 < roman.length ? roman[i + 1] : null;
    if (!romanToArabic.hasOwnProperty(current) || (next && !romanToArabic.hasOwnProperty(next))) {
      throw new Error("invalid roman number");
    }
    const currentValue = romanToArabic[current as RomanNumber];
    const nextValue = next ? romanToArabic[next as RomanNumber] : 0;
    if (currentValue < nextValue) {
      arabicNum -= currentValue;
    } else {
      arabicNum += currentValue;
    }
  }
  return arabicNum;
}
