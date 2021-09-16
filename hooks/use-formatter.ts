import {useMemo} from 'react';

export function useFormatter(
  locale: string | undefined,
  currency: string | undefined,
  options: Partial<Intl.NumberFormatOptions>,
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
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol', // Fallback
        ...options,
      });
    }
  }, [currency, locale, options]);
}
