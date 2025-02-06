let scene, camera, renderer, controls;
let blocks = [];
let score = 0;

// Initialize the game elements.
init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera & Controls
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 0); // Position the camera like a player's eyes

    controls = new THREE.PointerLockControls(camera, document.body);
    scene.add(controls.getObject());

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add ambient light
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    camera.add(pointLight);

    // Create blocks
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
        const block = new THREE.Mesh(geometry, material);
        block.position.set(Math.random() * 50 - 25, 0.5, Math.random() * 50 - 25);
        blocks.push(block);
        scene.add(block);
    }

    // Event listeners
    window.addEventListener("click", shoot);
    window.addEventListener("resize", onWindowResize);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.body.addEventListener('click', function() {
        controls.lock();
    });
}

let velocity = new THREE.Vector3();
let directions = {};
const MOVE_SPEED = 0.1;

function handleKeyDown(event) {
    switch (event.key) {
        case 'w':
            directions['w'] = true;
            break;
        case 's':
            directions['s'] = true;
            break;
        case 'a':
            directions['a'] = true;
            break;
        case 'd':
            directions['d'] = true;
            break;
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'w':
            directions['w'] = false;
            break;
        case 's':
            directions['s'] = false;
            break;
        case 'a':
            directions['a'] = false;
            break;
        case 'd':
            directions['d'] = false;
            break;
    }
}

// The shooting mechanism to handle hitting blocks
function shoot(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);

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

function updateMovement() {
    velocity.set(0, 0, 0);
    
    if (directions['w']) velocity.z -= MOVE_SPEED;
    if (directions['s']) velocity.z += MOVE_SPEED;
    if (directions['a']) velocity.x -= MOVE_SPEED;
    if (directions['d']) velocity.x += MOVE_SPEED;
    
    // Update the camera's position based on velocity
    controls.getObject().position.add(velocity);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    updateMovement();
    renderer.render(scene, camera);
}
