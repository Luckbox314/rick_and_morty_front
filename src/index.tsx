import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

import Root from './Views/Root';
import ErrorPage from './Views/ErrorPage';
import CharactersView from './Views/CharactersView';
import CharacterView, { loader as characterLoader } from './Views/CharacterView';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <CharactersView />,
      },
      {
        path: 'character/:id',
        element: <CharacterView />,
        loader: characterLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);