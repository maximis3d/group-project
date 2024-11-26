require('dotenv').config(); 
const express = require('express');
const app = require('./ApiApp'); 


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
