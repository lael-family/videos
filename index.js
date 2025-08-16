fetch('videos.json')
  .then(res => res.json())
  .then(data => {
    const videos = data.files || [];
    const player = document.getElementById('player');
    const description = document.getElementById('video-description');
    const videoList = document.getElementById('video-list');
    const searchBar = document.getElementById('search-bar');

    if (!videos.length) {
      description.textContent = 'No videos found';
      return;
    }

    let currentVideoIndex = Math.floor(Math.random() * videos.length);

    function loadVideo(v, index) {
      player.src = `https://drive.google.com/file/d/${v.id}/preview`;
      description.textContent = v.name;
      currentVideoIndex = index;

      document.querySelectorAll('.video-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    }

    // Populate video list
    videos.forEach((v, index) => {
      const div = document.createElement('div');
      div.className = 'video-item';
      div.textContent = v.name;
      div.onclick = () => loadVideo(v, index);
      videoList.appendChild(div);
    });

    // Load random video by default
    loadVideo(videos[currentVideoIndex], currentVideoIndex);

    // Search functionality
    searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
      document.querySelectorAll('.video-item').forEach((item, i) => {
        item.style.display = videos[i].name.toLowerCase().includes(query) ? 'flex' : 'none';
      });
    });
  })
  .catch(err => {
    console.error(err);
    alert('Failed to load videos.');
  });
