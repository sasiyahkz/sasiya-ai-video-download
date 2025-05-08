const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tiktok-posts', async (req, res) => {
  try {
    const response = await axios.get('https://tiktok-api23.p.rapidapi.com/api/user/posts', {
      params: {
        secUid: 'MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6',
        count: 12,
        cursor: 0
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
      }
    });

    const items = response.data.data || [];
    const posts = items.map(p => ({
      cover: p.video.cover,
      desc: p.desc || 'No description'
    }));

    res.json({ success: true, posts });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
