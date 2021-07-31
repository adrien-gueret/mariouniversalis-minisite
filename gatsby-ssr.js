import React from 'react';
import App from './src/modules/app';

export const wrapPageElement = ({ element }) => {
  return <App>{ element }</App>
}