import * as React from 'react';
import type { SVGProps } from 'react';
const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={18} height={8} {...props}>
    <path d='M1 3.5a.5.5 0 0 0 0 1zm16.354.854a.5.5 0 0 0 0-.708L14.172.464a.5.5 0 1 0-.708.708L16.293 4l-2.828 2.828a.5.5 0 1 0 .707.708zM1 4.5h16v-1H1z' />
  </svg>
);
export default Arrow;
