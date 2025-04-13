import { routeConfig } from '@/route';
import { RouterProvider, createBrowserRouter } from 'react-router';

function App() {
  const router = createBrowserRouter(routeConfig);
  return <RouterProvider router={router} />;
}

export default App;
