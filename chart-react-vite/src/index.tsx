import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './route';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
