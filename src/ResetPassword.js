import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { token, email } = useParams();

  const handleReset = () => {
    if (password === confirmPassword) {
      const resetEndpoint = `https://url-shortner-373v.onrender.com/shorturl/reset-password/${email}/${token}`;
      const newPassword = password;

      fetch(resetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Password reset failed');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Password reset successful:', data);
          setResetSuccess(true);
        })
        .catch((error) => {
          console.error('Password reset failed:', error.message);
        });
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div>
      <div>
        <h2>Reset Your Password</h2>
        {!resetSuccess ? (
          <>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button variant="contained" onClick={handleReset}>
              Reset Password
            </Button>
          </>
        ) : (
          <Typography>Password successfully changed!</Typography>
        )}
      </div>
    </div>
  );
}
