import React from 'react';
import clsx from 'clsx';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {goerr} from '@flyyer/goerr';
import {TemplateProps} from '@flyyer/types';

import '../styles/tailwind.css';

import logo from 'url:../static/logo.svg';
import background from '../static/background.jpeg';
import nintendo from '../static/nintendo.png';

import {Layer} from '../components/layers';

/**
 * Export to enable variables UI on Flyyer.io
 */
export const schema = V.Object({
  title: V.Nullable(V.String()),
  currency: V.Optional(
    V.String({default: 'USD', examples: ['USD', 'EUR', 'CLP', 'RUB']})
  ),
  price: V.Nullable(V.Number({examples: ['299']})),
  image: V.Nullable(
    V.Image({
      title: 'Product image URL',
      default: nintendo,
      examples: [nintendo]
    })
  ),
  background: V.Optional(
    V.Image({
      title: 'Background image URL',
      default: background
    })
  ),
  logo: V.Nullable(V.Image({default: logo}))
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, agent, locale = 'en'} = props;

  const {
    data: {title, image, background, logo, currency, price},
    isValid,
    errors
  } = validator.parse(variables);
  if (!isValid) {
    console.error('[Flyyer Variables]:', errors);
  }

  const [formatter, formatterError] = goerr(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0 // 2
      })
  );
  if (formatterError) {
    console.warn(
      '[Flyyer Template] Error creating Intl.NumberFormat: %o',
      formatterError
    );
  }

  return (
    <Layer id="banner" className={clsx('bg-white')}>
      <Layer className={clsx('grid grid-cols-12 grid-rows-12')}>
        <aside className={clsx('col-span-6 row-span-12')}>
          {background && (
            <img
              className="w-full h-full object-cover"
              src={background}
              crossOrigin="anonymous"
            />
          )}
        </aside>

        <aside className={clsx('col-span-6 row-span-10 p-3')}>
          {image && (
            <img
              className="w-full h-full object-scale-down"
              src={image}
              crossOrigin="anonymous"
            />
          )}
        </aside>
      </Layer>

      <Layer className={clsx('grid grid-cols-12 grid-rows-12')}>
        <div
          className={clsx(
            'col-start-0 col-span-full row-start-10 row-span-3',
            'flex flex-row justify-end items-center',
            'px-3 py-1 space-x-1'
          )}
        >
          {title && (
            <div
              className={clsx(
                'min-w-0 flex-shrink',
                'bg-yellow-300 pl-2 pr-1',
                'border-b-2 border-r-2 border-yellow-400',
                'filter drop-shadow-lg',
                'transform -skew-x-12'
              )}
            >
              <h1
                className={clsx(
                  'text-gray-900 text-base font-bold',
                  'truncate',
                  'transform skew-x-12'
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
                'transform -skew-x-12'
              )}
            >
              <p
                className={clsx(
                  'text-white text-lg font-bold',
                  'transform skew-x-12'
                )}
              >
                {formatter.format(price)}
              </p>
            </div>
          )}
        </div>
      </Layer>
    </Layer>
  );
}

function IS_FINITE(value: unknown): value is number {
  return Number.isFinite(value);
}
