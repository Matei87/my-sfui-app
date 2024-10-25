import { useDisclosure } from '@storefront-ui/react';
import { SfButton } from '@storefront-ui/react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import ProductImage from '../assets/img/Image.png';
import ButtonSelect from '../Components/ButtonSelect';
import Modal from '../Components/Modal';

const Homepage = () => {
  const { isOpen, open, close } = useDisclosure({ initialValue: false });

  console.log(isOpen, open, close);

  return (
    <div className='mx-auto my-8 flex justify-center'>
      <div className='card flex flex-col text-center gap-3 border p-3 relative'>
        <Link to={'/details'}>
          <div className='card-header relative h-auto'>
            <img
              className='object-cover w-full h-auto'
              src={ProductImage}
              alt='product'
            />
          </div>
        </Link>
        <div className='card-body flex flex-col gap-3 text-xs'>
          <span className='card-title'>PANTHÈRE DE CARTIER RING</span>
          <span className='card-description'>
            Rose gold, onyx, tsavorite garnets
          </span>
          <span className='card-price'>£51,500</span>
        </div>
        <div className='card-footer hidden'>
          <div className='text-center flex flex-col gap-3'>
            <span className='underline underline-offset-7'>
              Product details
            </span>
            <ButtonSelect />
          </div>

          {/* <button
            className='bg-black text-white p-1 uppercase w-full hover:bg-transparent hover:text-black hover:border'
            onClick={open}
          >
            Add to Bag
          </button> */}

          <SfButton
            onClick={open}
            className='bg-black text-white p-1 uppercase w-full hover:bg-transparent hover:text-black hover:border'
          >
            Add to Bag
          </SfButton>
        </div>
      </div>
      <Modal isOpen={isOpen} close={close} />
    </div>
  );
};

export default Homepage;
