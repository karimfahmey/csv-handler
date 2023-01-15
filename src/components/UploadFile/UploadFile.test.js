import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UploadFile from './UploadFile';

describe('<UploadFile />', () => {
  test('it should mount', () => {
    render(<UploadFile />);
    
    const uploadFile = screen.getByTestId('UploadFile');

    expect(uploadFile).toBeInTheDocument();
  });
});