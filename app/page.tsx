// pages/index.js
'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from '@/app/components/Login';

const HomePage = () => {
  const [token, setToken] = useState('');

  const handleLogin = (newToken) => {
    // Set token in cookie for both /home and /
    Cookies.set('token', newToken, { path: '/' });
    Cookies.set('token', newToken, { path: '/home' });
    setToken(newToken);
  };

  useEffect(() => {
    // Check if token exists in cookie
    const storedToken = Cookies.get('token');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from cookie on logout for both /home and /
    Cookies.remove('token', { path: '/' });
    Cookies.remove('token', { path: '/home' });
    setToken('');
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <p>Welcome, user!</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Render protected content here */}
        </div>
      )}
    </div>
  );
};

export default HomePage;



// // pages/index.js
// 'use client';
// import { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import Login from '@/app/components/Login';

// const HomePage = () => {
//   const [token, setToken] = useState('');

//   const handleLogin = (newToken) => {
//     // Set token in cookie
//     Cookies.set('token', newToken);
//     setToken(newToken);
//   };

//   useEffect(() => {
//     // Check if token exists in cookie
//     const storedToken = Cookies.get('token');

//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Remove token from cookie on logout
//     Cookies.remove('token');
//     setToken('');
//   };

//   return (
//     <div>
//       {!token ? (
//         <Login onLogin={handleLogin} />
//       ) : (
//         <div>
//           <p>Welcome, user!</p>
//           <button onClick={handleLogout}>Logout</button>
//           {/* Render protected content here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;
