// Import necessary components from Three.js
let scene, camera, renderer;
let blocks = [];
let score = 0;
let gun;
const BLOCK_SIZE = 1;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Lights
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Create blocks
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const block = new THREE.Mesh(geometry, material);
        block.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        blocks.push(block);
        scene.add(block);
    }

    // Gun model (simple representation)
    const gunGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.2);
    const gunMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    gun = new THREE.Mesh(gunGeometry, gunMaterial);
    gun.position.set(0, -0.5, 0);
    camera.add(gun);

    window.addEventListener("click", shoot);
    window.addEventListener("resize", onWindowResize);
}

function shoot(event) {
    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster from camera to mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersected objects
    const intersects = raycaster.intersectObjects(blocks);
    if (intersects.length > 0) {
        const hitBlock = intersects[0].object;
        scene.remove(hitBlock);
        blocks = blocks.filter(b => b !== hitBlock);
        score++;
        console.log("Score: ", score);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
