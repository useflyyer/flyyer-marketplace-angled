import React from 'react';
import clsx from 'clsx';

export function Layer({
  as = 'div',
  className,
  children,
  ...props
}: {as?: string} & React.ComponentPropsWithoutRef<'div'>) {
  const p = {
    ...props,
    className: clsx('absolute inset-0 w-full h-full', className),
  };
  return React.createElement(as, p, children);
  // Return (
  //   <div
  //     {...props}
  //     className={clsx('absolute inset-0 w-full h-full', className)}
  //   />
  // );
}
