import { jeju, roadRage } from '@/lib/fonts';
import { formOneSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Progress } from './progress';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './form';
import { RadioGroup, RadioGroupItem } from './radio-group';
import clsx from 'clsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select';
import { Button } from './button';

export default function StageOne({
  progress,
  stage,
  setStage
}: {
  progress: number;
  stage: number;

  setStage: Dispatch<SetStateAction<number>>;
}) {
  const savedForm =
    typeof window !== 'undefined' ? localStorage.getItem('form1') : null;

  const form = useForm<z.infer<typeof formOneSchema>>({
    resolver: zodResolver(formOneSchema),
    defaultValues: savedForm
      ? JSON.parse(savedForm)
      : {
          ticketType: '',
          numberOfTickets: ''
        }
  });

  function onSubmit(values: z.infer<typeof formOneSchema>) {
    console.log(values);
    setStage(2);
  }

  function onReset(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.reset({
      ticketType: '',
      numberOfTickets: ''
    });
  }

  const handleChange = () => {
    const updatedValues = form.getValues();
    localStorage.setItem('form1', JSON.stringify(updatedValues));
    console.log('Saved to LocalStorage:', updatedValues);
  };

  const options = [
    {
      type: 'Regular',
      price: 'Free'
    },

    {
      type: 'VIP',
      price: '$150'
    },

    {
      type: 'VVIP',
      price: '$150'
    }
  ];

  useEffect(() => {
    if (savedForm) {
      form.reset(JSON.parse(savedForm));
    } else {
      localStorage.setItem('form1', JSON.stringify(form.getValues()));
    }
  }, []);

  return (
    <section className='formPage space-y-8 md:p-12 p-6 md:bg-primary-700 bg-primary-400  md:rounded-[40px] rounded-[32px]'>
      <div className='space-y-3'>
        <div className='flex md:flex-row flex-col gap-3 md:items-center justify-between'>
          <h1 className={`${jeju.className} md:text-[32px] text-2xl`}>
            Ticket Selection
          </h1>
          <p className='leading-normal text-zinc-50'>Step {stage}/3</p>
        </div>

        <Progress
          aria-label='progress-33%'
          aria-labelledby='progress-33%'
          value={progress}
        />
      </div>

      <div className='md:p-6 p-0 space-y-8 rounded-[32px] md:bg-primary-400 bg-transparent md:border border-none border-primary-800 text-center'>
        <div className='md:p-6 px-6 py-4 border-x-2 border-b-2 border-t-0 border-primary-1000 rounded-3xl radial backdrop-blur-[7px]'>
          <div className='sm:space-y-2 space-y-10 text-zinc-50'>
            <div className='space-y-2'>
              <h2
                className={`${roadRage.className} md:text-[62px] text-[44px] leading-none`}
              >
                Techember Fest ”25
              </h2>
              <p className='md:text-base text-sm'>
                Join us for an unforgettable experience at{' '}
                <br className='sm:block hidden' /> [Event Name]! Secure your
                spot now.
              </p>
            </div>
            <div className='flex md:flex-row flex-col justify-center items-center md:gap-4 gap-1 leading-normal'>
              <p>📍 [Event Location]</p>
              <p className='md:block hidden'>||</p>
              <p>March 15, 2025 | 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className='h-1 bg-primary-1000'></div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={(event) => onReset(event)}
            onChange={handleChange}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='ticketType'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Select Ticket Type:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className='flex md:gap-[18px] gap-4 2md:flex-row flex-col items-center justify-between p-4 bg-primary-1100 border border-primary-1000 rounded-3xl aria-[invalid=true]:border-red-400'
                    >
                      {options.map((option) => (
                        <FormItem key={option.type} className='flex-1 w-full'>
                          <FormControl>
                            <RadioGroupItem
                              className='peer sr-only'
                              value={option.type}
                              checked={field.value === option.type}
                              onChange={handleChange}
                            />
                          </FormControl>
                          <FormLabel
                            className={clsx(
                              ' p-3 rounded-xl border-2 border-primary-300 bg-transparent space-y-3 cursor-pointer hover:bg-primary-1200 peer-focus:bg-primary-1200',
                              {
                                'bg-primary-1300': field.value === option.type
                              }
                            )}
                          >
                            <h3 className='font-semibold text-2xl leading-[1.1]'>
                              {option.price}
                            </h3>

                            <div>
                              <p className='text-zinc-50 leading-normal uppercase'>
                                {option.type} Access
                              </p>
                              <p className='text-sm leading-normal text-primary-100'>
                                20/52
                              </p>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='numberOfTickets'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Number of tickets</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select the number of tickets you want' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position='item-aligned' sideOffset={0}>
                      {Array(5)
                        .fill(0)
                        .map((e, index) => (
                          <SelectItem key={index} value={String(index + 1)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex md:flex-row flex-col-reverse md:items-center md:gap-6 gap-4'>
              <Button variant='outline' type='reset' className='flex-1'>
                Cancel
              </Button>

              <Button variant='default' type='submit' className='flex-1'>
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
