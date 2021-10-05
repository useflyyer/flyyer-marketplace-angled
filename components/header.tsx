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
        'flex flex-row sq:flex-col justify-end items-center sq:items-end',
        'px-3 py-1 space-x-1',
        className,
      )}
    >
      {title && (
        <div
          className={clsx(
            'hidden sq:block',
            'min-w-0 flex-shrink',
            'pl-2 pr-1',
            'filter drop-shadow-lg',
          )}
        >
          <h1
            className={clsx(
              'text-gray-900 dark:text-gray-50 text-base sq:text-lg story:text-2xl font-bold text-right',
              'line-clamp-1 sq:line-clamp-2 story:line-clamp-3',
            )}
          >
            <span
              style={{backgroundColor: color}}
              className={clsx('decoration-clone px-1.5 py-0.5')}
            >
              {title}
            </span>
          </h1>
        </div>
      )}
      {/* TODO: Duplicated to allow skew. Find a way to support it in one component */}
      {title && (
        <div
          style={{backgroundColor: color}}
          className={clsx(
            'block sq:hidden',
            'min-w-0 flex-shrink',
            'pl-2 pr-1',
            'filter drop-shadow-lg',
            'transform -skew-x-12',
          )}
        >
          <h1
            className={clsx(
              'text-gray-900 dark:text-gray-50 text-base sq:text-lg story:text-2xl font-bold text-right',
              'line-clamp-1 sq:line-clamp-2 story:line-clamp-3',
              'transform skew-x-12',
            )}
          >
            <span className={clsx('decoration-clone px-1.5 py-0.5')}>
              {title}
            </span>
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
