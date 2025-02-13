import { Alatsi, Road_Rage, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto'
});

export const jeju = localFont({
  src: '../../public/assets/fonts/JejuMyeongjo/JejuMyeongjo.woff2',
  display: 'swap',
  variable: '--font-jeju'
});

export const roadRage = Road_Rage({
  weight: '400',
  style: 'normal',
  display: 'swap'
});

export const alatsi = Alatsi({
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-alatsi'
});
