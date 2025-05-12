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
/*
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
  const texture = textureLoader.load(
  '../textures/mercury.jpg',
  () => console.log('✅ Textura cargada correctamente'),
  undefined,
  (err) => console.error('❌ Error al cargar la textura', err)
);


  const material = new THREE.MeshStandardMaterial({ map: texture });
  const mercury = new THREE.Mesh(geometry, material);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // luz suave global
scene.add(ambientLight);

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

initMercuryModel();*/

function createPlanetModel(planetId, texturePath, rotationSpeed = 0.0045) {
  const container = document.getElementById(planetId);
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    texturePath,
    () => console.log(`✅ Textura de ${planetId} cargada correctamente`),
    undefined,
    (err) => console.error(`❌ Error al cargar la textura de ${planetId}`, err)
  );

  const material = new THREE.MeshStandardMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  const pointLight = new THREE.PointLight(0xffffff, 1.3);
  pointLight.position.set(5, 5, 5);

  scene.add(ambientLight, pointLight, planet);
  camera.position.z = 3;

  function animate() {
    requestAnimationFrame(animate);
    planet.rotation.y += rotationSpeed;
    renderer.render(scene, camera);
  }

  animate();
}

// Inicializa todos los planetas
createPlanetModel('mercury-model', '../textures/mercury.jpg');
createPlanetModel('venus-model', '../textures/venus.jpg');
createPlanetModel('earth-model', '../textures/earth.jpg');
createPlanetModel('mars-model', '../textures/mars.jpg');
createPlanetModel('jupiter-model', '../textures/jupiter.jpg');
createPlanetModel('saturn-model', '../textures/saturn.jpg');
createPlanetModel('uranus-model', '../textures/uranus.png');
createPlanetModel('neptune-model', '../textures/neptune.jpg');

