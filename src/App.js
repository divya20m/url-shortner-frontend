import './App.css';
import { Route,Routes,useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect,useState } from 'react';
import { EmailLogin } from './EmailLogin';
import { SignUp } from './SignUp';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { MyAccount } from './MyAccount';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


function App() {
  const [allusers, setAllusers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(false);
    navigate('/login');
  };

  const handleSignupClick = () => {
    setShowSignup(false);
    navigate('/signup');
  };

  useEffect(() => {
    fetch("https://url-shortner-373v.onrender.com/shorturl")
      .then((res) => res.json())
      .then((data) => setAllusers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

 
  return (
    <div className="App">
       <AppBar position="static">
       <Toolbar disableGutters style={{justifyContent:"space-between",borderRadius: "5px"}}>
       {showLogin && (
        <Button variant="contained" onClick={handleLoginClick}>Login</Button>
      )}
      {showSignup && (
        <Button variant="contained"  onClick={handleSignupClick}>SignUp</Button>
      )}
       </Toolbar>
       </AppBar>
      <Routes>
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/shorturl/activate/:token" element={<MyAccount />} />
        <Route path="/login/myaccount" element={<MyAccount />} />
        <Route path="/shorturl/reset-password/:email/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;

