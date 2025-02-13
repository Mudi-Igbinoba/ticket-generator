import { Dispatch, SetStateAction } from 'react';
import { Progress } from './progress';
import { jeju, roadRage } from '@/lib/fonts';
import Ticket from './ticket';
import Image from 'next/image';
import { Button } from './button';

export default function StageThree({
  progress,
  stage,
  setStage
}: {
  progress: number;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <section className='formPage md:py-12   py-8 bg-primary-700 space-y-8 rounded-3xl text-center'>
      <div className='space-y-3 md:px-12 px-6'>
        <div className='flex gap-3 xs:flex-row flex-col xs:items-center justify-between'>
          <h1 className={`${jeju.className} md:text-[32px] text-2xl`}>Ready</h1>
          <p className='leading-normal text-zinc-50'>Step {stage}/3</p>
        </div>
        <Progress value={progress} />
      </div>

      <div className='md:px-12 px-6 md:space-y-4 space-y-3 text-zinc-50'>
        <h2
          className={`md:font-alatsi md:text-white  md:text-[32px] text-2xl md:font-normal font-bold md:leading-normal leading-[1.4]`}
        >
          Your Ticket is Booked!
        </h2>
        <p className='leading-normal'>
          <span className='md:inline hidden'>
            Check your email for a copy or you can{' '}
            <strong className='font-bold'>download</strong>
          </span>
          <span className='md:hidden inline'>
            You can download or Check your email for a copy
          </span>
        </p>
      </div>

      <div className='py-8'>
        <div className='md:px-0 px-6 relative max-w-[300px] h-[600px] mx-auto'>
          <Ticket className='mx-auto md:relative absolute inset-0 w-[300px] h-[600px]' />

          <div className='absolute top-5 inset-x-1/2 -translate-x-1/2 w-[86.7%] h-[74.4%] bg-primary-1400/10 border border-primary-200 rounded-2xl p-3.5 flex flex-col gap-y-5'>
            <div>
              <h3 className={`${roadRage.className} text-[34px] leading-none`}>
                Techember Fest ”25
              </h3>
              <div className='space-y-1 p-1 text-[10px] leading-normal'>
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
            </div>

            <div className='size-[140px] mx-auto border-4 rounded-xl border-primary-200/50 bg-transparent'></div>

            <div className='flex-1 p-1 rounded-lg bg-primary-1500 border text-start border-primary-1600 grid grid-cols-2 '>
              <div className='space-y-1 p-1 border-b border-primary-1300'>
                <h4 className='text-white/[0.33] text-[10px] leading-normal'>
                  Enter your name
                </h4>
                <p className='text-xs font-bold leading-normal'>Avi Chukwu</p>
              </div>

              <div className='space-y-1 p-1 pl-3 border-b border-l border-primary-1300'>
                <h4 className='text-white/[0.33] text-[10px] leading-normal'>
                  Enter your email *
                </h4>
                <p className='text-xs font-bold leading-normal'>
                  User@email.com
                </p>
              </div>

              <div className='space-y-1 p-1 border-b border-primary-1300 text-[10px]'>
                <h4 className='text-white/[0.33]  leading-normal'>
                  Ticket Type:
                </h4>
                <p className=' leading-normal'>Vip</p>
              </div>

              <div className='space-y-1 p-1 pl-3 border-b border-l border-primary-1300 text-[10px]'>
                <h4 className='text-white/[0.33]  leading-normal'>
                  Ticket for :
                </h4>
                <p className=' leading-normal'>1</p>
              </div>
              <div className='space-y-1 p-2 text-[10px] col-span-2'>
                <h4 className='text-white/[0.33]  leading-normal'>
                  Special request?
                </h4>
                <p className=' leading-normal'>
                  Nil ? Or the users sad story they write in there gets this
                  whole space, Max of three rows
                </p>
              </div>
            </div>
          </div>

          <Image
            src='./assets/images/barcode-web.svg'
            alt='barcode'
            width={236}
            height={68}
            className='absolute inset-x-1/2 -translate-x-1/2 bottom-[22px] md:block hidden'
          />

          <Image
            src='./assets/images/barcode-mobile.svg'
            alt='barcode'
            width={236}
            height={83}
            className='absolute inset-x-1/2 -translate-x-1/2 bottom-[7px] md:hidden block'
          />
        </div>
      </div>

      <div className='md:px-12 px-6 mt-6 flex md:flex-row flex-col-reverse md:items-center md:gap-6 gap-4'>
        <Button
          variant='outline'
          type='button'
          onClick={() => setStage(1)}
          className='flex-1'
        >
          Book Another Ticket
        </Button>

        <Button variant='default' type='button' className='flex-1'>
          Download Ticket
        </Button>
      </div>
    </section>
  );
}
