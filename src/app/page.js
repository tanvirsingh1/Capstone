'use client'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Auth, getUser } from '../auth';
import styles from './page.module.css'; // Import CSS module

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = async () => {
    try {
      await Auth.federatedSignIn();
      const userData = await getUser();
      setIsLoggedIn(true);
      setUser(userData);
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setIsLoggedIn(false);
      setUser({});
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn) {
        try {
          const user = await getUser();
          if (user) {
            setIsLoggedIn(true);
            setUser(user);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <>
    <div className={styles.container}>
      <div style={{ margin: '0 auto', width: '100%' }}>
        <div className="header" style={{textAlign:'center', color:'white', fontSize:'40px'}}>Fuel Fraud Detection</div>
        {isLoggedIn && <div className="welcome-message"  style={{textAlign:'center', color:'green', fontSize:'20px', margin:"10px"}}>Welcome {user.username}</div>}
        <div className={styles.button_container}>
          <Button variant="primary" onClick={handleLogin} disabled={isLoggedIn}>
            Login
          </Button>
          <Button variant="warning" onClick={handleLogout} disabled={!isLoggedIn}>
            Logout
          </Button>
        </div>
      </div>
      {isLoggedIn &&  <div className={styles.red_section}>
    <div style={{ fontSize: '20px', color:'white' }}>Content after login</div>
  </div>
}
    </div>
   
  </>
  );
}