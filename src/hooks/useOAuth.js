import { useState, useEffect } from 'react';

export default function useOAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    if (codeParam && !token) {
      async function getAccessToken() {
        try {
          const response = await fetch(
            `http://localhost:3000/getAccessToken?code=${codeParam}`,
          );
          const data = await response.json();

          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setToken(data.access_token);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
      getAccessToken();
    }
  }, [token]);

  return token;
}
