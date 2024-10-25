import { useState } from 'react';
import { redirect } from 'react-router-dom';

import './ProductCard.css';
import ProductImage from '../assets/img/Image.png';
import ButtonSelect from './ButtonSelect';

const ProductCard = () => {
  const [clicked, setClicked] = useState(false);

  console.log(clicked);

  return (
    <div className='mx-auto my-8 flex justify-center'>
      <div
        className='card flex flex-col text-center gap-3 border p-3 relative'
        onClick={() => redirect('/details')}
      >
        <div className='card-header relative h-auto'>
          <img
            className='object-cover w-full h-auto'
            src={ProductImage}
            alt='product'
          />
        </div>
        <div className='card-body flex flex-col gap-3 text-xs'>
          <span className='card-title'>PANTHÈRE DE CARTIER RING</span>
          <span className='card-description'>
            Rose gold, onyx, tsavorite garnets
          </span>
          <span className='card-price'>$51,500</span>
        </div>
        <div className='card-footer'>
          <div className='text-center flex flex-col gap-3'>
            <span className='underline underline-offset-7'>
              Product details
            </span>
            <ButtonSelect />
          </div>

          <button
            className='bg-black text-white p-1 uppercase w-full hover:bg-transparent hover:text-black hover:border'
            onClick={() => setClicked(!clicked)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
