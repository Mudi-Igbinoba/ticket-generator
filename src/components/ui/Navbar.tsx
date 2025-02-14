'use client';

import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './button';
import Arrow from './arrow';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './navigation-menu';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const components: { title: string; href: string }[] = [
  {
    title: 'Events',
    href: '/'
  },

  {
    title: 'My Tickets',
    href: '/tickets'
  },

  {
    title: 'About Project',
    href: '/about'
  }
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className='md:mx-0 mx-[3.5px] px-4 py-3 w-full md:rounded-3xl rounded-xl border border-primary-300 bg-primary-900 flex items-center justify-between backdrop-blur-[2px]'>
      <Link href='/'>
        <Image
          src='/assets/images/logo.svg'
          alt='Logo'
          width={92}
          height={36}
          priority
        />
      </Link>

      <NavigationMenu className='md:inline-block hidden'>
        <NavigationMenuList>
          {components.map((link) => (
            <NavigationMenuItem className='p-2.5 ' key={link.title}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    `${navigationMenuTriggerStyle()} duration-300 ease-in-out hover:text-primary-200 focus:text-primary-200`,
                    {
                      'text-white': pathname === link.href,
                      'text-[#B3B3B3]': pathname !== link.href
                    }
                  )}
                >
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Link href='/' className={buttonVariants({ variant: 'link' })}>
        <span>My Tickets</span>

        <Arrow className='duration-300 ease-in-out fill-primary-600 group-hover:fill-primary-100 group-hover:-rotate-45 group-active:fill-primary-100 group-active:-rotate-45 group-focus:fill-primary-100 group-focus:-rotate-45' />
      </Link>
    </header>
  );
}
