import { FC } from 'react';
import s from './Loader.module.scss';
import clsx from 'clsx';

export type LoaderProps = {
  readonly className?: string,
}

const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <svg xmlns='http://www.w3.org/2000/svg'
           version='1.0' width='40px' height='40px' viewBox='0 0 128 128'>
        <rect x='0' y='0' width='100%' height='100%' />
        <g>
          <circle cx='16' cy='64' r='16' fill='#4793FF' />
          <circle cx='16' cy='64' r='16' fill='#6bb9f7' transform='rotate(45,64,64)' />
          <circle cx='16' cy='64' r='16' fill='#a2d3fa' transform='rotate(90,64,64)' />
          <circle cx='16' cy='64' r='16' fill='#d3eafd' transform='rotate(135,64,64)' />
          <circle cx='16' cy='64' r='16' fill='#E5E5E5' transform='rotate(180,64,64)' />
          <circle cx='16' cy='64' r='16' fill='#E5E5E5' transform='rotate(225,64,64)' />
          <circle cx='16' cy='64' r='16' fill='#E5E5E5' transform='rotate(270,64,64)' />
          <circle cx='16' cy='64' r='16' fill='#E5E5E5' transform='rotate(315,64,64)' />
          <animateTransform attributeName='transform' type='rotate'
                            values='0 64 64;
                              45 64 64;
                              90 64 64;
                              135 64 64;
                              180 64 64;
                              225 64 64;
                              270 64 64;
                              315 64 64;'
                            calcMode='discrete' dur='720ms' repeatCount='indefinite' />
        </g>
      </svg>
    </div>
  );
};

export default Loader;