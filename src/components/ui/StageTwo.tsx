'use client';
import { jeju } from '@/lib/fonts';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Progress } from './progress';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './form';
import { formTwoSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import clsx from 'clsx';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { useUploadImage } from '@/lib/hooks/useUploadImage';
import Spinner from './spinner';

export default function StageTwo({
  progress,
  stage,
  setStage
}: {
  progress: number;
  stage: number;
  setStage: Dispatch<SetStateAction<number | null>>;
}) {
  const { imageURL, uploadImage, loading } = useUploadImage();

  const savedForm =
    typeof window !== 'undefined' ? localStorage.getItem('form2') : null;
  const savedImage =
    typeof window !== 'undefined' ? localStorage.getItem('imageUrl') : null;

  const form = useForm<z.infer<typeof formTwoSchema>>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: savedForm
      ? JSON.parse(savedForm)
      : {
          image: savedImage || '',
          name: '',
          email: '',
          request: ''
        }
  });

  function onSubmit(values: z.infer<typeof formTwoSchema>) {
    console.log('Form values:', values);
    setStage(3);
  }

  function goBack() {
    setStage(1);
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    const uploadedUrl = await uploadImage(selectedFile);
    if (uploadedUrl) {
      form.setValue('image', uploadedUrl, { shouldValidate: true });
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'form2',
          JSON.stringify({ ...form.getValues(), image: uploadedUrl })
        );
      }
    } else {
      form.setValue('image', '', { shouldValidate: true });
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'form2',
          JSON.stringify({ ...form.getValues(), image: '' })
        );
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg']
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile);
      if (uploadedUrl) {
        form.setValue('image', uploadedUrl, { shouldValidate: true });
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'form2',
            JSON.stringify({ ...form.getValues(), image: uploadedUrl })
          );
        }
      }
    }
  };

  useEffect(() => {
    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);
      form.reset(parsedForm);
    }
    const subscription = form.watch((values) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('form2', JSON.stringify(values));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className='formPage md:p-12 px-6 py-8 bg-primary-700 space-y-8 rounded-3xl'>
      <div className='space-y-3'>
        <div className='flex gap-3 xs:flex-row flex-col xs:items-center justify-between'>
          <h1 className={`${jeju.className} md:text-[32px] text-2xl`}>
            Attendee Details
          </h1>
          <p className='leading-normal text-zinc-50'>Step {stage}/3</p>
        </div>
        <Progress
          aria-label='progress-66%'
          aria-labelledby='progress-66%'
          value={progress}
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='md:p-6 p-0 space-y-8 rounded-[32px] md:bg-primary-400 bg-transparent md:border border-none border-primary-800'
        >
          <FormField
            control={form.control}
            name='image'
            render={() => (
              <FormItem className='p-6 md:pb-12  border border-primary-1000 rounded-3xl bg-primary-1100 md:space-y-8 space-y-3'>
                <FormLabel>Upload Profile Photo</FormLabel>

                <div
                  {...getRootProps()}
                  className={clsx(
                    'md:bg-black/20  bg-transparent md:h-[200px] h-auto relative cursor-pointer',
                    {
                      'opacity-50 pointer-events-none': loading
                    }
                  )}
                >
                  <Input
                    id='image'
                    type='file'
                    {...getInputProps()}
                    onBlur={handleFileChange}
                    disabled={loading}
                    aria-describedby=':r8:-form-item-message'
                  />

                  <div
                    className={clsx(
                      'md:absolute  md:m-0 mx-auto group md:inset-1/2 md:-translate-x-1/2 md:-translate-y-1/2 min-[380px]:size-60 w-full h-60 rounded-[32px] bg-primary-800 border-4 border-primary-200/50 p-6 flex flex-col justify-center items-center text-center duration-300 ease-in-out'
                    )}
                    style={{
                      backgroundImage: imageURL ? `url(${imageURL})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    aria-describedby=':r8:-form-item-message'
                    tabIndex={0}
                  >
                    <div
                      className={clsx(
                        'absolute duration-300 ease-in-out rounded-[32px] z-0 inset-0 group-hover:block bg-black/30 w-full',
                        {
                          block: loading,
                          hidden: !loading
                        }
                      )}
                    ></div>

                    <div
                      className={clsx(
                        'space-y-4 block z-10 duration-300 ease-in-out ',
                        {
                          'opacity-0 group-hover:opacity-100 ':
                            imageURL && !loading,
                          'opacity-100 ': loading
                        }
                      )}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          <Image
                            src='./assets/images/cloud.svg'
                            alt='cloud icon'
                            width={32}
                            height={32}
                            className='mx-auto duration-300 ease-in-out'
                          />
                          <p className='text-zinc-50 leading-normal'>
                            Drag & drop or click to upload
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='h-1 bg-primary-1000'></div>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Enter your name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=''
                    {...field}
                    onBlur={handleFileChange}
                    className='h-12 w-full rounded-xl border border-primary-1000 bg-transparent p-3 text-base text-white hover:ring-2  hover:ring-primary-200 aria-[invalid=true]:border-red-400'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Enter your email *</FormLabel>
                <FormControl className=''>
                  <div
                    id='something'
                    className='flex group duration-300 ease-in-out items-center gap-2 h-12  hover:ring-2  hover:ring-primary-200 w-full rounded-xl border border-primary-1000 bg-transparent p-3 text-base text-white aria-[invalid=true]:border-red-400'
                  >
                    <Image
                      src='./assets/images/mail.svg'
                      alt='envelope icon'
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder='hello@avioflagos.io'
                      {...field}
                      onBlur={handleFileChange}
                      className='bg-transparent border-none p-0 w-full focus-visible:ring-0 placeholder:text-[#aaa] '
                      id=':r18:-form-item'
                      aria-describedby=':ra:-form-item-description :ra:-form-item-message'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='request'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Special request?</FormLabel>
                <FormControl className=''>
                  <Textarea
                    placeholder='Textarea'
                    className='h-32 resize-none w-full rounded-xl border border-primary-1000 bg-transparent p-3 text-base text-white placeholder:text-[#aaa] aria-[invalid=true]:border-red-400 hover:ring-2  hover:ring-primary-200'
                    {...field}
                    onBlur={handleFileChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex md:flex-row flex-col-reverse md:items-center md:gap-6 gap-4'>
            <Button
              variant='outline'
              type='button'
              onClick={goBack}
              className='flex-1'
            >
              Back
            </Button>

            <Button variant='default' type='submit' className='flex-1'>
              Get My Free Ticket
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
