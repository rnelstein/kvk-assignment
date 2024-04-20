import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom'

import Home from './Home';
import { getCompanies } from '../utils/api';

jest.mock('../utils/api', () => ({
  getCompanies: jest.fn(),
}));

const mockedGetCompanies = getCompanies as jest.Mock;

describe('Home Component', () => {
  it('should render the search form and list of companies', async () => {
    const companiesData = [
      { id: 1, name: 'Company A', logo: '/path/to/logo1.png', streetName: 'Street A', zipCode: '12345', city: 'City A' },
      { id: 2, name: 'Company B', logo: '/path/to/logo2.png', streetName: 'Street B', zipCode: '23456', city: 'City B' },
    ];
    mockedGetCompanies.mockResolvedValueOnce({ data: companiesData });

    render(<Home />, { wrapper: Router });

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'search query' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText('Company A')).toBeInTheDocument()
    expect(await screen.findByText('Company B')).toBeInTheDocument()
  });
});
