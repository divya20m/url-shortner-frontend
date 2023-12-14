import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://url-shortner-373v.onrender.com/shorturl/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        navigate('/login/myaccount', { state: { userEmail: email } })
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div style={{display: "flex", margin: "40px",justifycontent: "center",flexDirection: "column", gap: "20px"}}>
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <TextField
          id="outlined-basic-password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </div>
      <Button component={Link} to="/forgotPassword">
        Forgot Password
      </Button>
    </div>
  );
}
