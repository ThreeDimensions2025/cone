class DesignStudio {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.objects = [];
    }

    init() {
        document.getElementById('render-container').appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 10;

        this.addLighting();
        this.addEventListeners();
        this.createDefaultObject();

        this.animate();
    }

    addLighting() {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(directionalLight);
    }

    createDefaultObject() {
        const geometry = new THREE.ConeGeometry(2, 5, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xFF5722 });
        const cone = new THREE.Mesh(geometry, material);

        this.scene.add(cone);
        this.objects.push(cone);
    }

    addEventListeners() {
        document.getElementById('update-btn').addEventListener('click', () => this.updateScene());
    }

    updateScene() {
        this.clearScene();

        const numCones = parseInt(document.getElementById('numCones').value);
        const baseRadius = parseFloat(document.getElementById('baseRadius').value);
        const coneHeight = parseFloat(document.getElementById('coneHeight').value);

        for (let i = 0; i < numCones; i++) {
            const geometry = new THREE.ConeGeometry(baseRadius, coneHeight, 32);
            const material = new THREE.MeshStandardMaterial({ color: 0xFF5722 });
            const cone = new THREE.Mesh(geometry, material);

            cone.position.x = (i - numCones / 2) * (baseRadius * 2);
            this.scene.add(cone);
            this.objects.push(cone);
        }
    }

    clearScene() {
        this.objects.forEach(obj => this.scene.remove(obj));
        this.objects = [];
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

const studio = new DesignStudio();
studio.init();