import { useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Paypal from './Paypal';

import {
  SfModal,
  SfButton,
  SfIconClose,
  SfIconFavorite,
} from '@storefront-ui/react';
import ProductImage from '../assets/img/Image.png';
import './Modal.css';
import ApplePay from './ApplePay';

const Modal = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
  const headingId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* <SfButton onClick={open}>Add to Bag</SfButton> */}

      {/* Backdrop */}
      <CSSTransition
        in={isOpen}
        nodeRef={backdropRef}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: 'opacity-0',
          enterDone: 'opacity-100 transition duration-200 ease-out',
          exitActive: 'opacity-0 transition duration-200 ease-out',
        }}
      >
        <div
          ref={backdropRef}
          className='fixed inset-0 bg-neutral-700 bg-opacity-50'
        />
      </CSSTransition>

      {/* Modal */}
      <CSSTransition
        in={isOpen}
        nodeRef={modalRef}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: 'translate-y-10 opacity-0',
          enterDone:
            'translate-y-0 opacity-100 transition duration-200 ease-out',
          exitActive:
            'translate-y-10 opacity-0 transition duration-200 ease-out',
        }}
      >
        <SfModal
          open
          onClose={close}
          ref={modalRef}
          as='section'
          role='alertdialog'
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          className='max-w-[90%] md:max-w-lg flex flex-col'
        >
          <header className='flex justify-center items-center'>
            <h3
              id={headingId}
              className='font-bold text-center uppercase border-bottom'
            >
              Shopping Bag (1)
            </h3>
            <SfButton
              square
              variant='tertiary'
              className='absolute right-2'
              onClick={close}
            >
              <SfIconClose />
            </SfButton>
          </header>
          <div className='mx-auto my-8 flex justify-center'>
            <div className='flex gap-3 p-3' id='card'>
              <Link to={'/details'}>
                <div className='card-header relative h-auto'>
                  <img
                    className='object-cover w-full h-auto'
                    src={ProductImage}
                    alt='product'
                  />
                </div>
              </Link>
              <div className='card-body flex gap-3 text-sm relative'>
                <div className='flex flex-col justify-between p-3 gap-2'>
                  <span className='card-title font-semibold'>
                    PANTHÈRE DE CARTIER RING
                  </span>
                  <span className='card-description'>
                    Rose gold, onyx, tsavorite garnets
                  </span>
                  <span>Ref. B4085044</span>
                  <span className='text-grey'>ENGRAVING ADDED</span>
                  <div className='flex justify-between'>
                    <span className='card-price font-semibold'>£51,500</span>
                    <SfIconFavorite />
                  </div>
                </div>
                <SfButton
                  square
                  variant='tertiary'
                  className='flex justify-end items-baseline'
                  onClick={close}
                >
                  <SfIconClose />
                </SfButton>
              </div>
              <div className='card-footer hidden'>
                <div className='text-center flex flex-col gap-3'>
                  <span className='underline underline-offset-7'>
                    Product details
                  </span>
                </div>
              </div>
            </div>
          </div>
          <footer className='flex flex-col gap-4 mt-auto'>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col'>
                <p className='font-semibold margin-0'>SUBTOTAL</p>
                <p className='margin-0'>Includes VAT</p>
              </div>
              <span className='font-semibold'>£51,500</span>
            </div>
            {/* <SfButton variant='secondary' onClick={close}>
              Skip
            </SfButton>
            <SfButton onClick={close}>Yes!</SfButton> */}
            <button className='bg-black uppercase p-2 text-center text-white'>
              Continue to Shopping bag
            </button>
            <span className='uppercase my-1 text-sm'>
              you can also checkout with:
            </span>
            <button className='bg-yellow p-2 flex justify-center items-center'>
              <Paypal />
            </button>
            <button className='bg-black p-2 flex justify-center items-center'>
              <ApplePay />
            </button>
          </footer>
        </SfModal>
      </CSSTransition>
    </div>
  );
};

export default Modal;
