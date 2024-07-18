import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './components/navigation/Routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}
export default App;
