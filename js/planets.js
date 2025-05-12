// Show More / Less functionality
document.querySelectorAll('.toggle-text').forEach(button => {
  button.addEventListener('click', () => {
    const paragraph = button.previousElementSibling;
    paragraph.classList.toggle('expanded');
    button.textContent = paragraph.classList.contains('expanded')
      ? 'Show less ↑'
      : 'Show more ↓';
  });
});

// Audio playback management
let currentAudio = null;

document.querySelectorAll('.sound-button').forEach(button => {
  const audio = new Audio(button.dataset.audio);
  button.addEventListener('click', () => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (audio.paused) {
      audio.play();
      currentAudio = audio;
    } else {
      audio.pause();
      currentAudio = null;
    }
  });
});

// Three.js Mercury model
function initMercuryModel() {
  const container = document.getElementById('mercury-model');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('../textures/mercury.jpg');
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const mercury = new THREE.Mesh(geometry, material);
  scene.add(mercury);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  camera.position.z = 3;

  function animate() {
    requestAnimationFrame(animate);
    mercury.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

initMercuryModel();
