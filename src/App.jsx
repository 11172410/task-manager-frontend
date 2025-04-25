import React from 'react'
import { Button } from "flowbite-react";
import api from './api/axiosDefaults';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  // Quick check that api fetching is working
  useEffect(() => {
    api.get('/tasks/')
      .then(res => console.log('API response:', res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);
  
  return (
    <>
      <LoadingSpinner />
    </>
  )
}

export default App
