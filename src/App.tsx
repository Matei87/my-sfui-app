import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import Homepage from './Pages/Homepage';
import Details from './Pages/Details';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/details' element={<Details />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
