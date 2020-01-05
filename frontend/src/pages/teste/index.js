import React from 'react';

import AsyncSelect from 'react-select/async';

const colourOptions = ['matheus', 'igor', 'carlos'];

const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default function WithPromises() {
  return (
    <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
  );
}
