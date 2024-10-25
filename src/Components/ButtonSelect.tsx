import { useState } from 'react';
import { SfSelect } from '@storefront-ui/react';

const options = [
  { label: '30 mm', value: '30' },
  { label: '35 mm', value: '35' },
  { label: '40 mm', value: '40' },
  { label: '41 mm', value: '41' },
  { label: '45 mm', value: '45' },
];

const ButtonSelect = () => {
  const [size, setSize] = useState('');

  return (
    <label>
      <SfSelect
        className='text-center uppercase'
        placeholder='Select size'
        size='base'
        value={size}
        onChange={(event) => setSize(event.target.value)}
        required
      >
        {options.map((option) => (
          <option
            className='uppercase flex justify-center text-center m-auto'
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </SfSelect>
    </label>
  );
};

export default ButtonSelect;
