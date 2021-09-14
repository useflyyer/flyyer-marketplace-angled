import React, {useState} from 'react';
import clsx from 'clsx';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import {proxy} from '@flyyer/proxy';

import '../styles/tailwind.css';

import logo from 'url:../static/logo.svg';
import background from '../static/background.jpeg';
import alternative from '../static/alternative.jpeg';

import {Layer} from '../components/layers';

/**
 * Export to enable variables UI on Flyyer.io
 */
export const schema = V.Object({
  title: V.String({default: 'Created with React.js and Tailwind'}),
  description: V.Optional(V.String()),
  image: V.Image({
    title: 'Product image URL'
  }),
  background: V.Image({
    title: 'Background image URL',
    examples: [alternative],
    default: background
  }),
  logo: V.Image({default: logo})
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, agent, locale = 'en'} = props;

  const {
    data: {title, description, image, logo},
    isValid,
    errors
  } = validator.parse(variables);
  if (!isValid) {
    console.error('[Flyyer Variables]:', errors);
  }

  const [counter, setCounter] = useState(0);

  return (
    <Layer className={clsx('relative grid grid-cols-12 grid-rows-12')}>
      <div
        className={clsx(
          'col-span-12 row-span-12',
          'banner:col-span-6 banner:row-span-12'
        )}
      >
        <img
          className="w-full h-full object-cover"
          src={image}
          crossOrigin="anonymous"
        />
      </div>

      <header>
        <button
          onClick={() => {
            setCounter((s) => s + 1);
          }}
        >
          {counter}
        </button>
      </header>

      {/* <Layer>
        <img className="w-full h-full object-cover" src={proxy(image)} />
      </Layer>
      <Layer className="bg-gradient-to-t from-black opacity-0 banner:opacity-60" />
      <Layer className="flex flex-col justify-center items-center px-4 py-4 space-y-1 text-white text-center">
        <img
          src={proxy(logo)}
          className="object-scale-down object-bottom w-full h-full banner:w-1/3 banner:h-auto banner:max-h-12 sq:max-h-16"
        />

        <h1 className="hidden banner:block text-xl sq:text-2xl font-bold tracking-tight leading-tight sq:leading-tight banner:line-clamp-3 sq:line-clamp-5">
          {title}
        </h1>
        {description && (
          <p className="hidden sq:block text-gray-50 tracking-tight sq:line-clamp-5">
            {description}
          </p>
        )}
      </Layer> */}
    </Layer>
  );
}
