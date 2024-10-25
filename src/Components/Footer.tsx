import { SfIconCreditCard } from '@storefront-ui/react';

const contactOptions = [
  {
    label: 'SHIPPING & RETURNS',
    details: [
      'We offer you several shipping options and the possibility to return or exchange your purchased creations.',
      'View shipping',
      'View returns',
    ],
  },
  {
    label: 'PICK UP IN BOUTIQUE',
    details: [
      'Order online or by phone and pick up in the boutique of your choice.',
    ],
  },
  {
    label: '100% SECURE PAYMENT',
    details: [<SfIconCreditCard />, <SfIconCreditCard />, <SfIconCreditCard />],
  },
  {
    label: 'AUTHENTIC GUARANTEE',
    details: [
      'Cartier guarantees the authenticity of all product purchased through Cartier online',
      'Discover more',
    ],
  },
];

export default function Footer() {
  return (
    <footer className='pt-10 bg-neutral-100'>
      <div className='py-10 md:flex md:mx-auto max-w-[1536px]'>
        {contactOptions.map(({ label, details }) => (
          <div className='mx-auto my-4 text-center' key={label}>
            <p className='py-1 my-2 font-medium typography-text-lg font-body'>
              {label}
            </p>
            {details?.map((option, idx) => (
              <p
                className='leading-5 typography-text-sm text-neutral-600 font-body'
                key={idx}
              >
                {option}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className='bg-footer px-4 py-10 md:flex md:py-6 w-full mx-auto h-[66px] '>
        <p className='flex items-center py-2 leading-5 text-center typography-text-sm text-white font-body md:ml-6'>
          COPYRIGHT © 2020 CARTIER
        </p>
      </div>
    </footer>
  );
}
