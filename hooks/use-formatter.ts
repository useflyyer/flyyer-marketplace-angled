import {useMemo} from 'react';

export function useFormatter(
  locale: string | undefined,
  currency: string | undefined,
  options?: Partial<Intl.NumberFormatOptions>,
) {
  return useMemo(() => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol', // 'narrowSymbol' fails on Safari iOS
        ...options,
      });
    } catch {
      try {
        // Catch invalid currency code
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          currencyDisplay: 'symbol', // Fallback
          ...options,
        });
      } catch {
        return null;
      }
    }
  }, [currency, locale, options]);
}
