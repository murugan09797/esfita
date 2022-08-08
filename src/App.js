import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDetails from "./components/UserDetails";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer/>
      <UserDetails />
    </>
  );
}

export default App;
