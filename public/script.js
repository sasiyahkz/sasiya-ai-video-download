async function loadTikTokPosts() {
  const status = document.getElementById('status');
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';
  status.textContent = "Loading posts...";

  try {
    const response = await fetch('/api/tiktok-posts');
    const data = await response.json();

    if (data.success) {
      data.posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-card';
        div.innerHTML = `
          <img class="post-thumb" src="${post.cover}" alt="thumb" />
          <p>${post.desc}</p>
        `;
        container.appendChild(div);
      });
      status.textContent = '';
    } else {
      status.textContent = "Failed to load posts.";
    }
  } catch (err) {
    status.textContent = "Error: " + err.message;
  }
}

function downloadVideo() {
  const url = document.getElementById('videoUrl').value;
  const status = document.getElementById('status');
  if (!url) {
    status.textContent = "Please enter a video URL.";
    return;
  }
  status.textContent = "Download feature coming soon...";
}
