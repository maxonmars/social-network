import React from 'react';
import {render} from '@testing-library/react';
import {Main} from './App';

test('renders learn react link', () => {
  const { getByText } = render(<Main />);
  const linkElement = getByText('loading...');
  expect(linkElement).toBeInTheDocument();
});

