import { createRoutesFromElements, Route } from 'react-router';
import { AppLayout } from './layout';
import { Home } from './pages/home';
// import About from './pages/about';
// import Path from './pages/path';

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route path="/" element={<Home />} />
    {/* <Route path="/path" element={<Path />} />
    <Route path="/about" element={<About />} /> */}
  </Route>
);
