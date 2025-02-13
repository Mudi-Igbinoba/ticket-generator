import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { jeju } from '@/lib/fonts';

const buttonVariants = cva(
  `duration-300 ease-in-out h-auto ${jeju.className}`,
  {
    variants: {
      variant: {
        default:
          'text-white py-3 px-6 rounded-lg bg-primary-200 hover:bg-white focus:bg-white active:bg-white hover:text-primary-600 focus:text-primary-600 active:text-primary-600 leading-normal text-base',
        outline:
          'text-primary-200 border border-primary-200 py-3 px-6 rounded-lg bg-transparent hover:bg-white focus:bg-white active:bg-white leading-normal text-base',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'group bg-white hover:bg-primary-200 active:bg-primary-200 focus:bg-primary-200 text-primary-600 hover:text-primary-100 active:text-primary-100 focus:text-primary-100 md:text-base text-sm leading-5 uppercase inline-flex gap-2 items-center  border border-[#D5EA00]/10 hover:border-primary-100 focus:border-primary-100 active:border-primary-100 md:px-6 px-4 md:py-4 py-3 md:h-[52px] h-11 rounded-xl'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
