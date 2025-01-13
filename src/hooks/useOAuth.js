import { useState, useEffect } from 'react';

export default function useOAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    // local storage is convinient a
    // user can leave our web page and
    // come back and still be logged in
    // Bad security practice unless we
    // use https only cookies for storage

    if (codeParam && !token) {
      (async function fetchToken() {
        try {
          // GET access token from /api/oauth/github/access-token
          const response = await fetch(
            `http://localhost:3000/api/oauth/github/access-token?code=${codeParam}`,
          );
          const data = await response.json();

          // If our server returns a token, store it
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setToken(data.access_token);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      })();
    }
  }, [token]);

  return token;
}
