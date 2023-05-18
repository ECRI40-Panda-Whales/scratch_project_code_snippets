import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import Sidebar from '../src/containers/Sidebar/Sidebar.jsx';

describe('Testing for Sidebar', () => {
    beforeEach(()=> 
    render(<Sidebar/>))

    test('')
})