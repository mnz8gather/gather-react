import CanceledRadio from '@/components/CanceledRadio';
import { Checkbox } from 'antd';

const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];

export default () => {
  return (
    <>
      <div>
        <CanceledRadio.Group
          options={options}
          onChange={(v) => {
            console.log('CanceledRadio', v);
          }}
        />
      </div>
      <div>
        <CanceledRadio.Group
          options={options}
          defaultValue={['Apple', 'Pear', 'Orange']}
          onChange={(v) => {
            console.log('CanceledRadio', v);
          }}
        />
      </div>
      <div>
        <CanceledRadio.Group
          options={options}
          value={['Apple', 'Pear', 'Orange']}
          onChange={(v) => {
            console.log('CanceledRadio', v);
          }}
        />
      </div>
      <div>
        <Checkbox.Group
          options={options}
          defaultValue={['Apple', 'Pear', 'Orange']}
          onChange={(v) => {
            console.log('Checkbox', v);
          }}
        />
      </div>
    </>
  );
};
