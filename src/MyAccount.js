import { useState, useEffect } from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { useLocation } from 'react-router-dom';


export function MyAccount() {
  const location = useLocation();
  const userEmail = location.state?.userEmail || '';
  const { pathname } = location;

  const [urls, setUrls] = useState('');
  const [storedURLs, setStoredURLs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStoredURLs();
  }, []);

  useEffect(() => {
    if (pathname.includes('/shorturl/activate/')) {
      const token = pathname.split('/').pop();
      handleActivation(token);
    } else {
      fetchStoredURLs();
    }
  }, [pathname]);

  const handleActivation = async (token) => {
    try {
      const response = await fetch(`https://url-shortner-373v.onrender.com/shorturl/activate/${token}`, {
        method: 'GET',
       
      });

      if (response.ok) {
        
        console.log('Account activated successfully!');
        fetchStoredURLs();
      } else {
        throw new Error('Failed to activate account');
      }
    } catch (error) {
      console.error('Error activating account:', error);
      setError('Error activating account');
    }
  };

  const fetchStoredURLs = async () => {
    try {
      const response = await fetch('https://url-shortner-373v.onrender.com/shorturl/shorten', {
        method: 'GET',
        headers: {
          'Authorization': userEmail,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStoredURLs(data); 
      } else {
        throw new Error('Failed to fetch user URLs');
      }
    } catch (error) {
      console.error('Error fetching stored URLs:', error);
      setError('Error fetching stored URLs');
    }
  };


  const handleShortenURL = async () => {
    try {
      const response = await fetch('https://url-shortner-373v.onrender.com/shorturl/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userEmail,
        },
        body: JSON.stringify({ urls: [urls] }), 
      });
  
      if (response.ok) {
        const data = await response.json();
        setStoredURLs([...storedURLs, ...data]); 
        setUrls('');
      } else {
        const errorMessage = await response.text();
        throw new Error('Failed to shorten URL: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError(error.message);
    }
  };
  
  
  
  
  
  

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{display: "flex", margin: "40px",justifycontent: "center",flexDirection: "column", gap: "20px"}}>
      <TextField
        id="outlined-basic-originalURL"
        label="Original URL"
        variant="outlined"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <Button variant="contained" onClick={handleShortenURL}>
        Shorten URL
      </Button>
      </div>
      <Table>
  <TableHead>
    <TableRow>
      <TableCell>Original URL</TableCell>
      <TableCell>Shortened URL</TableCell>
      <TableCell>Date and Time</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {storedURLs.map((url, index) => (
  <TableRow key={index}>
    <TableCell>{url.originalURL}</TableCell>
    <TableCell>{url.shortURL}</TableCell>
    <TableCell>{url.date}</TableCell>
  </TableRow>
))}
  </TableBody>
</Table>
      {error && <p>{error}</p>}
    </div>
  );
}
