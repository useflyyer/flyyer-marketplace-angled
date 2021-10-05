import clsx from 'clsx';
import React from 'react';
import {useFormatter} from '../hooks/use-formatter';
import {IS_FINITE} from '../utils';

export function Header({
  title,
  locale,
  currency,
  price,
  color,
  className,
  ...props
}: any) {
  const formatter = useFormatter(locale, currency);

  return (
    <div
      className={clsx(
        'flex flex-row justify-end items-center',
        'px-3 py-1 space-x-1',
        className,
      )}
    >
      {title && (
        <div
          style={{backgroundColor: color}}
          className={clsx(
            'min-w-0 flex-shrink',
            'pl-2 pr-1',
            // 'border-b-2 border-r-2 border-yellow-400',
            'filter drop-shadow-lg',
            'transform -skew-x-12',
          )}
        >
          <h1
            className={clsx(
              'text-gray-900 dark:text-gray-50 text-base sq:text-lg story:text-2xl font-bold text-right',
              'line-clamp-1 sq:line-clamp-2',
              'transform skew-x-12',
            )}
          >
            {title}
          </h1>
        </div>
      )}

      {formatter && IS_FINITE(price) && (
        <div
          className={clsx(
            'flex-none',
            'bg-gray-700 px-1',
            'border-b-2 border-r-2 border-gray-800',
            'filter drop-shadow-lg',
            'transform -skew-x-12',
          )}
        >
          <p
            className={clsx(
              'text-white text-lg sq:text-xl story:text-2xl font-bold',
              'transform skew-x-12',
            )}
          >
            {formatter.format(price)}
          </p>
        </div>
      )}
    </div>
  );
}
