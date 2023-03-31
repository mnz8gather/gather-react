import CanceledRadioGroup from '@/components/CanceledRadioGroup';

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
      <CanceledRadioGroup options={options} />
    </>
  );
};
