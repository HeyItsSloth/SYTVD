document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const urlInput = document.getElementById('urlInput');

  downloadBtn.addEventListener('click', async () => {
    const videoUrl = urlInput.value.trim();

    if (videoUrl !== '') {
      const downloadUrl = `/download?url=${encodeURIComponent(videoUrl)}`;
      window.location.href = downloadUrl;
    }
  });
});
