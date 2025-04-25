import React from 'react'
import { Button } from "flowbite-react";
import api from './api/axiosDefaults';
import { useEffect } from 'react';

const App = () => {
  // Quick check that api fetching is working
  useEffect(() => {
    api.get('/tasks/')
      .then(res => console.log('API response:', res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
  <Button color='green'>Click me</Button>
    </div>
  )
}

export default App
