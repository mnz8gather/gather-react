import { createBrowserRouter, RouterProvider } from 'react-router';
import { routeConfig } from '@/route';

function App() {
  const router = createBrowserRouter(routeConfig);
  return <RouterProvider router={router} />;
}

export default App;
