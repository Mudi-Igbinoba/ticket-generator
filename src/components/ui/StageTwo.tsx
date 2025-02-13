'use client';
import { jeju } from '@/lib/fonts';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
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

export default function StageTwo({
  progress,
  stage,
  setStage
}: {
  progress: number;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');

  const savedForm =
    typeof window !== 'undefined' ? localStorage.getItem('form2') : null;

  const image =
    typeof window !== 'undefined' ? localStorage.getItem('imageUrl') : null;

  const form = useForm<z.infer<typeof formTwoSchema>>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: savedForm
      ? JSON.parse(savedForm)
      : {
          image: image || '',
          name: '',
          email: '',
          request: ''
        }
  });

  function onSubmit(values: z.infer<typeof formTwoSchema>) {
    console.log('Form values:', values);
    console.log('Image type:', values.image instanceof File);
    setStage(3);
  }

  function goBack() {
    setStage(1);
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'ticket');

      fetch('https://api.cloudinary.com/v1_1/drl0zzfsj/upload', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Cloudinary response:', data);
          setImageURL(data.url);
          localStorage.setItem('imageUrl', data.url);

          // Update the form state
          const updatedValues = { ...form.getValues(), image: data.url };
          localStorage.setItem('form2', JSON.stringify(updatedValues));
          form.setValue('image', data.url, { shouldValidate: true });
        })
        .catch((error) => console.error('Upload error:', error));
    },

    [form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxSize: 10 * 1024 * 1024
  });

  const handleChange = (event: any) => {
    const updatedValues = { ...form.getValues(), image: imageURL };
    localStorage.setItem('form2', JSON.stringify(updatedValues));

    const selectedFile = event.target.files?.[0];
    if (!imageURL) {
      setFile(selectedFile);
      form.setValue('image', selectedFile, { shouldValidate: true });

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'ticket');

      fetch('https://api.cloudinary.com/v1_1/drl0zzfsj/upload', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Cloudinary response:', data);
          setImageURL(data.url);
          localStorage.setItem('imageUrl', data.url);

          // Update form state with image URL
          const updatedValues = { ...form.getValues(), image: data.url };
          localStorage.setItem('form2', JSON.stringify(updatedValues));
        })
        .catch((error) => console.error('Upload error:', error));
    }
  };

  useEffect(() => {
    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);
      form.reset(parsedForm); // Restore form data
    }

    if (image) {
      setImageURL(image); // Restore the image URL
      form.setValue('image', image);
    }
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
        <Progress value={progress} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='md:p-6 p-0 space-y-8 rounded-[32px] md:bg-primary-400 bg-transparent md:border border-none border-primary-800'
        >
          <FormField
            control={form.control}
            name='image'
            render={({}) => (
              <FormItem className='p-6 md:pb-12  border border-primary-1000 rounded-3xl bg-primary-1100 md:space-y-8 space-y-3'>
                <FormLabel htmlFor='image'>Upload Profile Photo</FormLabel>

                <div
                  {...getRootProps()}
                  className='md:bg-black/20 bg-transparent md:h-[200px] h-auto relative cursor-pointer'
                >
                  <input
                    onBlur={handleChange}
                    id='image'
                    type='file'
                    {...getInputProps()}
                  />

                  <div
                    className={clsx(
                      'md:absolute md:m-0 mx-auto group md:inset-1/2 md:-translate-x-1/2 md:-translate-y-1/2 min-[380px]:size-60 w-full h-60 rounded-[32px] bg-primary-800 border-4 border-primary-200/50 p-6 flex flex-col justify-center items-center text-center duration-300 ease-in-out'
                    )}
                    style={{
                      backgroundImage: imageURL ? `url(${imageURL})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className='absolute duration-300 ease-in-out rounded-[32px] z-0 inset-0 hidden group-hover:block bg-black/30 w-full'></div>

                    <div
                      className={clsx(
                        'space-y-4 block z-10 duration-300 ease-in-out ',
                        {
                          'opacity-0 group-hover:opacity-100 ': imageURL
                        }
                      )}
                    >
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
                    onBlur={handleChange}
                    className='h-12 w-full rounded-xl border border-primary-1000 bg-transparent p-3 text-base text-white'
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
                  <div className='flex items-center gap-2 h-12 w-full rounded-xl border border-primary-1000 bg-transparent p-3 text-base text-white'>
                    <Image
                      src='./assets/images/mail.svg'
                      alt='envelope icon'
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder='hello@avioflagos.io'
                      {...field}
                      onBlur={handleChange}
                      className='bg-transparent border-none p-0 w-full focus-visible:ring-0 placeholder:text-[#aaa]'
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
                    className='h-32 resize-none w-full rounded-xl border border-primary-1000 bg-transparent p-3 text-base text-white placeholder:text-[#aaa]'
                    {...field}
                    onBlur={handleChange}
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
