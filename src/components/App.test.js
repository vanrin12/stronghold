import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import App from './App';

const mockStore = configureStore()

it('renders without crashing', () => {
  const initialState = Map()
  const store = mockStore(initialState)

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
});
