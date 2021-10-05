import React from 'react';
import chroma from 'chroma-js';
import clsx from 'clsx';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {proxy} from '@flyyer/proxy';
import {TemplateProps} from '@flyyer/types';

import '../styles/tailwind.css';

import logo from 'url:../static/logo.svg';
import background from '../static/background.jpeg';
import nintendo from '../static/nintendo.png';

import {Layer} from '../components/layers';
import {Header} from '../components/header';
import {IS_FINITE} from '../utils';

/**
 * Export to enable variables UI on Flyyer.io
 */
export const schema = V.Object({
  title: V.Nullable(V.String({examples: ['Nintendo Switch']})),
  currency: V.Optional(
    V.String({default: 'USD', examples: ['USD', 'EUR', 'CLP', 'RUB']}),
  ),
  price: V.Nullable(V.Number({examples: ['299']})),
  image: V.Nullable(
    V.Image({
      title: 'Product image URL',
      examples: [nintendo],
    }),
  ),
  background: V.Nullable(
    V.Image({
      title: 'Background image URL',
      default: background,
    }),
  ),
  logo: V.Nullable(V.Image({default: logo})),
  color: V.ColorHex({default: '#fcd34d'}),
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, agent, locale = 'en'} = props;

  const {
    data: {title, image, background, logo, currency, price, color},
    isValid,
    errors,
  } = validator.parse(variables);
  if (!isValid) {
    console.error('[Flyyer Variables]:', errors);
  }

  // https://github.com/gka/chroma.js/issues/181#issuecomment-423884867
  const lab = color ? chroma(color).lab() : null;
  let isDark = false;
  if (lab) {
    const [L] = lab;
    isDark = L < 70;
  }

  return (
    <Layer className="overflow-hidden">
      <Layer
        id="mobile"
        className={clsx('banner:hidden bg-white grid grid-rows-6')}
      >
        {image && (
          <div className={clsx(logo ? 'row-span-5' : 'row-span-full')}>
            <img
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
              src={proxy(image)}
            />
          </div>
        )}
        {logo && (
          <div
            style={{backgroundColor: color}}
            className={clsx('p-1', image ? 'row-span-1' : 'row-span-full')}
          >
            <img
              src={proxy(logo)}
              crossOrigin="anonymous"
              className="w-full h-full object-contain object-center"
            />
          </div>
        )}
      </Layer>
      <Layer
        id="banner"
        className={clsx('hidden banner:block sq:hidden bg-white')}
      >
        <Layer className={clsx('grid grid-cols-12 grid-rows-12')}>
          <aside className={clsx('col-span-6 row-span-12')}>
            {background && (
              <img
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                src={proxy(background)}
              />
            )}
          </aside>

          <aside
            className={clsx(
              'p-3 col-span-6',
              title || price ? 'row-span-10' : 'row-span-12',
            )}
          >
            {image && (
              <img
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
                src={proxy(image)}
              />
            )}
          </aside>
        </Layer>

        <Layer className={clsx('grid grid-cols-12 grid-rows-12')}>
          <Header
            className={clsx(
              'col-start-0 col-span-full row-start-10 row-span-3',
              isDark && 'dark',
            )}
            title={title}
            locale={locale}
            currency={currency}
            price={price}
            color={color}
          />
        </Layer>
      </Layer>

      <Layer id="sq" className={clsx('hidden sq:block story:hidden bg-white')}>
        {background && (
          <Layer>
            <img
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={proxy(background)}
            />
          </Layer>
        )}

        {background && (
          <div className="w-full h-1/2 bg-gradient-to-b from-black absolute top-0 left-0 right-0" />
        )}

        {image && (
          <Layer className="flex pl-12 pr-6 pt-20 pb-12">
            <div className="flex-1 bg-white -skew-y-12 transform" />
          </Layer>
        )}
        {image && (
          <Layer className="flex pl-12 pr-6 pt-14 pb-14">
            <img
              className="flex-1 p-2 object-contain object-top"
              crossOrigin="anonymous"
              src={proxy(image)}
            />
          </Layer>
        )}

        <Layer>
          {logo && (
            <img
              src={proxy(logo)}
              className="absolute h-8 top-8 right-0 left-0 w-full px-4 object-contain object-left"
            />
          )}
          <Header
            className={clsx(
              'absolute bottom-4 right-0 left-0 w-full px-4',
              isDark && 'dark',
            )}
            title={title}
            locale={locale}
            currency={currency}
            price={price}
            color={color}
          />
        </Layer>
      </Layer>

      <Layer id="story" className={clsx('hidden story:block bg-white')}>
        {background && (
          <Layer>
            <img
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={proxy(background)}
            />
          </Layer>
        )}

        {background && (
          <div className="w-full h-1/3 bg-gradient-to-b from-black absolute top-0 left-0 right-0" />
        )}

        {image && (
          <Layer className="px-0 pt-40">
            <div className="h-2/3 w-full bg-white -skew-y-12 transform" />
          </Layer>
        )}
        {image && (
          <Layer className="relative flex flex-col justify-start items-stretch pt-32 pb-storysafe">
            {logo && (
              <img
                src={proxy(logo)}
                className="absolute h-8 top-storysafe right-0 left-0 w-full px-4 object-contain object-center"
              />
            )}

            <img
              className="px-6 min-h-0 object-contain object-top flex-grow flex-shrink"
              crossOrigin="anonymous"
              src={proxy(image)}
            />
            <Header
              className={clsx('flex-none', isDark && 'dark')}
              title={title}
              locale={locale}
              currency={currency}
              price={price}
              color={color}
            />
          </Layer>
        )}
      </Layer>
    </Layer>
  );
}
