import { Button, TextField } from '@mui/material';
import { useState } from 'react';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://url-shortner-373v.onrender.com/shorturl/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const message = responseData.message;
        setMessage(message);
        console.log('User signed up successfully!', responseData.result, responseData.activationLink);


      } else {
        const responseData = await response.json();
        if (responseData.error === 'Email already exists') {
          setError('Email already exists. Please use a different email.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  return (
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

      <TextField
        id="outlined-basic-firstname"
        label="FirstName"
        variant="outlined"
        type="FirstName"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)} />

      <TextField
        id="outlined-basic-LastName"
        label="LastName"
        variant="outlined"
        type="LastName"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)} />

      <Button variant="contained" onClick={handleSignUp}>
        SignUp
      </Button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
