const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static('frontend'));

// Endpoint to handle the video download
app.get('/download', async (req, res) => {
  const { url } = req.query;

  // Validate the YouTube video URL
  if (!ytdl.validateURL(url)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(url);

    const { title } = info.videoDetails;

    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    res.header('Content-Type', 'video/mp4');

    ytdl(url, { format: 'mp4' }).pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error downloading the video');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
