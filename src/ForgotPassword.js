import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await fetch('https://url-shortner-373v.onrender.com/shorturl/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log(data.resetLink);
        setError('');
      } else {
        setMessage('');
        setError(data.error || 'Failed to send email.');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={handleSendEmail}>Send Reset Email</Button>
        {message && <Typography>{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </div>
    </div>
  );
}
