import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LightingMode, CameraPreset } from '../types/architecture';

interface Architectural3DViewerProps {
  initialModel?: 'modular' | 'travertino' | 'cristal' | 'domotica';
  onModelChange?: (model: 'modular' | 'travertino' | 'cristal' | 'domotica') => void;
  className?: string;
  isHero?: boolean;
}

export const Architectural3DViewer: React.FC<Architectural3DViewerProps> = ({
  initialModel = 'modular',
  onModelChange,
  className = '',
  isHero = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<'modular' | 'travertino' | 'cristal' | 'domotica'>(initialModel);
  const [lightingMode, setLightingMode] = useState<LightingMode>('sunset');
  const [isRotating, setIsRotating] = useState(false);
  const [explodedAmount, setExplodedAmount] = useState(0);
  const [solarHour, setSolarHour] = useState(18.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('hero');
  const [isControlsOpen, setIsControlsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const explodedPartsRef = useRef<{ obj: THREE.Object3D; originalY: number; originalX: number; originalZ: number; explodeDir: THREE.Vector3 }[]>([]);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const waterfallMeshRef = useRef<THREE.Mesh | null>(null);
  const palmLeavesRef = useRef<THREE.Group | null>(null);

  // Sync state if initialModel changes
  useEffect(() => {
    setSelectedModel(initialModel);
  }, [initialModel]);

  const handleSelectModel = (model: 'modular' | 'travertino' | 'cristal' | 'domotica') => {
    setSelectedModel(model);
    setExplodedAmount(0);
    if (onModelChange) {
      onModelChange(model);
    }
  };

  // Helper for rounded rectangle (smooth fillet corners)
  const createRoundedRectShape = (w: number, h: number, r: number) => {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  };

  // 1. Procedural Natural Oak Wood Slat Texture
  const createWoodSlatTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#b89a6c';
    ctx.fillRect(0, 0, 512, 512);

    for (let x = 0; x < 512; x += 1) {
      const grain = (Math.sin(x * 0.2) + Math.sin(x * 0.05)) * 14;
      const r = Math.min(255, Math.max(0, 184 + grain));
      const g = Math.min(255, Math.max(0, 154 + grain * 0.8));
      const b = Math.min(255, Math.max(0, 108 + grain * 0.6));
      ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
      ctx.fillRect(x, 0, 1, 512);
    }

    const slatWidth = 32;
    for (let x = 0; x < 512; x += slatWidth) {
      ctx.fillStyle = 'rgba(40, 30, 20, 0.45)';
      ctx.fillRect(x, 0, 3, 512);
      ctx.fillStyle = 'rgba(255, 235, 200, 0.25)';
      ctx.fillRect(x + 3, 0, 1.5, 512);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  // 2. Procedural Travertine Stone Texture (Horizontal Sedimentary Veins & Pores)
  const createTravertineTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#d5ccbe';
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 3) {
      const alpha = 0.05 + Math.sin(y * 0.04) * 0.04;
      ctx.fillStyle = y % 6 === 0 ? `rgba(160, 145, 125, ${alpha * 1.8})` : `rgba(240, 235, 225, ${alpha})`;
      ctx.fillRect(0, y, 512, 2.5);
    }

    for (let i = 0; i < 500; i++) {
      const px = Math.random() * 512;
      const py = Math.random() * 512;
      const pw = 2 + Math.random() * 10;
      const ph = 1 + Math.random() * 2;
      ctx.fillStyle = 'rgba(130, 115, 95, 0.16)';
      ctx.fillRect(px, py, pw, ph);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  };

  // 3. Procedural Architectural Concrete / Microcement Texture
  const createConcreteTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#cbc8c1';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 2500; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const alpha = Math.random() * 0.08;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
      ctx.fillRect(x, y, 2 + Math.random() * 2, 2 + Math.random() * 2);
    }

    ctx.fillStyle = 'rgba(80, 75, 70, 0.15)';
    ctx.fillRect(170, 0, 2, 512);
    ctx.fillRect(340, 0, 2, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  // 4. Procedural Matte Graphite Texture
  const createGraphiteTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#222325';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const alpha = Math.random() * 0.06;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  // 5. Procedural Curtain Fabric Texture
  const createCurtainTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, 256, 256);

    for (let x = 0; x < 256; x += 16) {
      const grad = ctx.createLinearGradient(x, 0, x + 16, 0);
      grad.addColorStop(0, 'rgba(200, 205, 210, 0.35)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(1, 'rgba(200, 205, 210, 0.35)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, 16, 256);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  // Setup Three.js Canvas & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x181a1d);
    scene.fog = new THREE.FogExp2(0x181a1d, 0.012);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 250);
    camera.position.set(-1.0, 3.2, 13.8);
    camera.lookAt(0.6, 2.7, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
    lightsGroup.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffb066, 2.5);
    sunLight.position.set(18, 16, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 120;
    const d = 22;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0004;
    lightsGroup.add(sunLight);
    sunLightRef.current = sunLight;

    const skyFillLight = new THREE.DirectionalLight(0xa5c4e8, 0.7);
    skyFillLight.position.set(-16, 20, 8);
    lightsGroup.add(skyFillLight);

    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let currentRotationY = -0.08;
    let currentRotationX = 0.04;
    let targetRotationY = -0.08;
    let targetRotationX = 0.04;
    let currentZoom = 24.0;
    let targetZoom = 24.0;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.004;
      targetRotationX = Math.max(-0.15, Math.min(1.0, targetRotationX));
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.015;
      targetZoom = Math.max(7, Math.min(35, targetZoom));
    };

    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-0.15, Math.min(1.0, targetRotationX));
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isMouseDown) {
        targetRotationY += 0.0016;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentZoom += (targetZoom - currentZoom) * 0.08;

      const targetLookAt = new THREE.Vector3(0.5, 2.5, 0);
      const radius = currentZoom;
      camera.position.x = targetLookAt.x + radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
      camera.position.z = targetLookAt.z + radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
      camera.position.y = targetLookAt.y + radius * Math.sin(currentRotationX) + 0.5;
      camera.lookAt(targetLookAt);

      if (palmLeavesRef.current) {
        palmLeavesRef.current.rotation.z = Math.sin(elapsedTime * 1.2) * 0.03;
        palmLeavesRef.current.rotation.x = Math.cos(elapsedTime * 0.9) * 0.02;
      }

      if (waterMeshRef.current && (waterMeshRef.current.material as THREE.MeshStandardMaterial)) {
        const mat = waterMeshRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.8 + Math.sin(elapsedTime * 2.2) * 0.06;
      }

      if (waterfallMeshRef.current) {
        waterfallMeshRef.current.position.y = 1.35 + Math.sin(elapsedTime * 8) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // BUILD ALL 4 ARCHITECTURAL MODELS WITH MASTER REALISM
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
    }

    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    explodedPartsRef.current = [];

    const isWire = lightingMode === 'wireframe';

    // Materials
    const woodTexture = createWoodSlatTexture();
    const travertineTexture = createTravertineTexture();
    const concreteTexture = createConcreteTexture();
    const graphiteTexture = createGraphiteTexture();
    const curtainTexture = createCurtainTexture();

    const travertineMat = new THREE.MeshStandardMaterial({
      color: 0xeae6e1,
      map: travertineTexture || undefined,
      roughness: 0.58,
      metalness: 0.08,
      wireframe: isWire,
    });

    const darkTravertineMat = new THREE.MeshStandardMaterial({
      color: 0xbdb7b0,
      map: travertineTexture || undefined,
      roughness: 0.65,
      metalness: 0.1,
      wireframe: isWire,
    });

    const woodPlankMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
      wireframe: isWire,
    });

    const concreteShellMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      wireframe: isWire,
    });

    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x141516,
      map: graphiteTexture || undefined,
      roughness: 0.45,
      metalness: 0.5,
      wireframe: isWire,
    });

    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x0f1112,
      roughness: 0.25,
      metalness: 0.9,
      wireframe: isWire,
    });

    const glassPanelsMat = new THREE.MeshPhysicalMaterial({
      color: 0xf3f8fa,
      transmission: 0.82,
      opacity: 0.85,
      transparent: true,
      roughness: 0.06,
      ior: 1.52,
      wireframe: isWire,
    });

    const warmGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfef3c7,
      transmission: 0.75,
      opacity: 0.88,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      wireframe: isWire,
    });

    const sheerCurtainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: curtainTexture || undefined,
      roughness: 0.9,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
      wireframe: isWire,
    });

    const terraceConcreteMat = new THREE.MeshStandardMaterial({
      color: 0xf2f2f2,
      roughness: 0.1,
      metalness: 0.05,
      wireframe: isWire,
    });

    const greenLawnMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0, // Clean light gray floor instead of dark green
      roughness: 0.8,
      wireframe: isWire,
    });

    const palmFrondMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      side: THREE.DoubleSide,
      wireframe: isWire,
    });

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.1,
      metalness: 0.12,
      transparent: true,
      opacity: 0.82,
      wireframe: isWire,
    });

    const textureLoader = new THREE.TextureLoader();
    const modularTex = textureLoader.load('/721099171_1894561801234574_4184927469999369895_n.jpg');
    const travertinoTex = textureLoader.load('/725153208_1487642689218128_819161186868229869_n.jpg');
    const cristalTex = textureLoader.load('/725279091_1358169512825333_7700966943037890292_n.jpg');
    const domoticaTex = textureLoader.load('/725588653_1731047268076807_2055582365866218853_n.jpg');
    
    // Función auxiliar para crear un panel de exhibición en el modelo 3D
    const createExhibitionPanel = (texture: THREE.Texture, x: number, y: number, z: number) => {
      const aspect = 16/10;
      const height = 18; // Mucho más grande, como un telón de fondo escénico
      const width = height * aspect;
      const geo = new THREE.PlaneGeometry(width, height);
      const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y + 4, z - 8);
      return mesh;
    };

    const registerModularPart = (obj: THREE.Object3D, explodeDir: THREE.Vector3) => {
      explodedPartsRef.current.push({
        obj,
        originalY: obj.position.y,
        originalX: obj.position.x,
        originalZ: obj.position.z,
        explodeDir,
      });
      modelGroup.add(obj);
    };

    // =========================================================================
    // 1. MODEL: MODULARIDAD PREMIUM (Identical to User Image)
    // =========================================================================
    if (selectedModel === 'modular') {
      // Suelo blanco de estudio (antes pasto)
      const lawn = new THREE.Mesh(new THREE.PlaneGeometry(50, 40), greenLawnMat);
      lawn.rotation.x = -Math.PI / 2;
      lawn.position.set(0, -0.01, 0);
      lawn.receiveShadow = true;
      modelGroup.add(lawn);

      // Panel publicitario gigante inmersivo
      const displayPanel = createExhibitionPanel(modularTex, 0, 5, -8);
      modelGroup.add(displayPanel);

      // Terraza (Base blanca plana)
      const deck = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.2, 10.0), terraceConcreteMat);
      deck.position.set(0, 0.1, 0);
      deck.receiveShadow = true;
      modelGroup.add(deck);

      // Planta Baja - Cristal Principal (Izquierda)
      const groundGlass = new THREE.Mesh(new THREE.BoxGeometry(8.0, 2.8, 5.0), glassPanelsMat);
      groundGlass.position.set(-2.0, 1.6, 0);
      registerModularPart(groundGlass, new THREE.Vector3(-0.5, 0, -0.5));

      // Planta Baja - Bloque Sólido (Derecha)
      const groundSolid = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.8, 5.5), concreteShellMat);
      groundSolid.position.set(4.5, 1.6, 0);
      groundSolid.castShadow = true;
      registerModularPart(groundSolid, new THREE.Vector3(1, 0, 0));

      // Hendidura Vertical de Cristal (Ventana estrecha derecha)
      const slitGlass = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.4, 5.6), graphiteMat);
      slitGlass.position.set(3.5, 1.6, 0);
      modelGroup.add(slitGlass);

      // Planta Alta - Voladizo Masivo Blanco (Izquierda-Centro)
      const upperVol = new THREE.Mesh(new THREE.BoxGeometry(13.0, 3.2, 6.0), concreteShellMat);
      upperVol.position.set(0.5, 4.6, 0.5);
      upperVol.castShadow = true;
      registerModularPart(upperVol, new THREE.Vector3(0, 1, 0.5));

      // Recorte interior de cristal del voladizo
      const upperGlass = new THREE.Mesh(new THREE.BoxGeometry(12.4, 2.6, 6.2), glassPanelsMat);
      upperGlass.position.set(0.2, 4.6, 0.5);
      modelGroup.add(upperGlass);

      // Iluminación blanca brillante tipo museo
      const groundLight = new THREE.PointLight(0xffffff, 4.0, 12);
      groundLight.position.set(-2.0, 2.0, 2.0);
      modelGroup.add(groundLight);

      const upperLight = new THREE.PointLight(0xffffff, 4.0, 12);
      upperLight.position.set(0.5, 4.6, 3.0);
      modelGroup.add(upperLight);
    }

    // =========================================================================
    // 2. MODEL: CASA TRAVERTINO I (Hyper-Realistic Travertine Residence)
    // =========================================================================
    else if (selectedModel === 'travertino') {
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(26, 0.5, 22), terraceConcreteMat);
      plinth.position.set(0, -0.25, 0);
      plinth.receiveShadow = true;
      modelGroup.add(plinth);

      const displayPanel = createExhibitionPanel(travertinoTex, 0, 5, -8);
      modelGroup.add(displayPanel);

      // Main Ground Mass Travertine
      const groundMass = new THREE.Mesh(new THREE.BoxGeometry(16.0, 3.5, 10.0), travertineMat);
      groundMass.position.set(0, 1.75, 0);
      groundMass.castShadow = true;
      registerModularPart(groundMass, new THREE.Vector3(0, 0, -0.5));

      // Ground Windows
      const groundGlass = new THREE.Mesh(new THREE.BoxGeometry(6.0, 3.0, 10.2), warmGlassMat);
      groundGlass.position.set(2.0, 1.75, 0);
      modelGroup.add(groundGlass);

      // Upper Floating Mass Travertine
      const upperMass = new THREE.Mesh(new THREE.BoxGeometry(18.0, 3.2, 8.0), travertineMat);
      upperMass.position.set(1.0, 5.1, 0.5);
      upperMass.castShadow = true;
      registerModularPart(upperMass, new THREE.Vector3(0, 1, 0.5));

      // Vertical Travertine Fins
      for (let l = 0; l < 8; l++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.2, 1.0), travertineMat);
        fin.position.set(-6.0 + l * 1.0, 5.1, 4.0);
        modelGroup.add(fin);
      }

      const light = new THREE.PointLight(0xffa726, 4.0, 15);
      light.position.set(2.0, 2.0, 5.0);
      modelGroup.add(light);
    }

    // =========================================================================
    // 3. MODEL: VILLA CRISTAL & AGUA (Multi-Story Glass Villa & Waterfall Pool)
    // =========================================================================
    else if (selectedModel === 'cristal') {
      const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(24, 0.5, 18), terraceConcreteMat);
      basePlinth.position.set(0, -0.25, 0);
      modelGroup.add(basePlinth);

      const displayPanel = createExhibitionPanel(cristalTex, 0, 5, -8);
      modelGroup.add(displayPanel);

      // Water Pool
      const pool = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.2, 8.0), waterMat);
      pool.position.set(0, 0.1, 4.0);
      modelGroup.add(pool);

      // Ground Glass Pavilion
      const lowerLounge = new THREE.Mesh(new THREE.BoxGeometry(12.0, 3.0, 8.0), glassPanelsMat);
      lowerLounge.position.set(0, 1.75, 0);
      registerModularPart(lowerLounge, new THREE.Vector3(0, 0, -0.5));

      // Intermediate Concrete Slab
      const terraceSlab = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.4, 10.0), concreteShellMat);
      terraceSlab.position.set(0, 3.45, 0);
      terraceSlab.castShadow = true;
      registerModularPart(terraceSlab, new THREE.Vector3(0, 0.5, 0));

      // Upper Glass Box
      const upperGlassBox = new THREE.Mesh(new THREE.BoxGeometry(10.0, 3.0, 8.0), glassPanelsMat);
      upperGlassBox.position.set(0, 5.15, 0);
      registerModularPart(upperGlassBox, new THREE.Vector3(0, 1.0, 0));

      // Roof
      const upperRoof = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.3, 9.0), darkSteelMat);
      upperRoof.position.set(0, 6.8, 0);
      registerModularPart(upperRoof, new THREE.Vector3(0, 1.5, 0));

      const glow = new THREE.PointLight(0x0ea5e9, 5.0, 15);
      glow.position.set(0, 2.0, 2.0);
      modelGroup.add(glow);
    }

    // =========================================================================
    // 4. MODEL: RESIDENCIA DOMÓTICA V (High-Tech Brutalist Dark Mansion)
    // =========================================================================
    else {
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(24, 0.5, 19), graphiteMat);
      plinth.position.set(0, -0.25, 0);
      modelGroup.add(plinth);

      const displayPanel = createExhibitionPanel(domoticaTex, 0, 5, -8);
      modelGroup.add(displayPanel);

      // Monolithic Matte Black Block
      const lowerBlackMass = new THREE.Mesh(new THREE.BoxGeometry(14.0, 6.0, 10.0), graphiteMat);
      lowerBlackMass.position.set(0, 3.0, 0);
      lowerBlackMass.castShadow = true;
      registerModularPart(lowerBlackMass, new THREE.Vector3(0, 0.5, 0));

      // Golden Warm Recessed Strip
      const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(14.2, 0.4, 10.2), new THREE.MeshBasicMaterial({ color: 0xffa000 }));
      lightStrip.position.set(0, 4.5, 0);
      registerModularPart(lightStrip, new THREE.Vector3(0, 1.0, 0));

      const loungeLight = new THREE.PointLight(0xffa000, 5.0, 12);
      loungeLight.position.set(0, 4.5, 5.5);
      modelGroup.add(loungeLight);
    }

    scene.add(modelGroup);
  }, [selectedModel, lightingMode]);

  // Handle Exploded View Slider Update
  useEffect(() => {
    explodedPartsRef.current.forEach((item) => {
      const factor = explodedAmount * 2.5;
      item.obj.position.x = item.originalX + item.explodeDir.x * factor;
      item.obj.position.y = item.originalY + item.explodeDir.y * factor * 1.5;
      item.obj.position.z = item.originalZ + item.explodeDir.z * factor;
    });
  }, [explodedAmount]);

  // Handle Lighting Mode & Sun Position
  useEffect(() => {
    const scene = sceneRef.current;
    const sunLight = sunLightRef.current;
    if (!scene || !sunLight) return;

    if (lightingMode === 'sunset') {
      scene.background = new THREE.Color(0x1e2023);
      scene.fog = new THREE.FogExp2(0x1e2023, 0.012);
      sunLight.color.setHex(0xffaa55);
      sunLight.intensity = 2.6;
      sunLight.position.set(18, 14, 14);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.22;
    } else if (lightingMode === 'night') {
      scene.background = new THREE.Color(0x0a0c0e);
      scene.fog = new THREE.FogExp2(0x0a0c0e, 0.018);
      sunLight.color.setHex(0x406080);
      sunLight.intensity = 0.35;
      sunLight.position.set(-15, 20, -10);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.35;
    } else if (lightingMode === 'day') {
      scene.background = new THREE.Color(0x22262a);
      scene.fog = new THREE.FogExp2(0x22262a, 0.008);
      sunLight.color.setHex(0xfff5ea);
      sunLight.intensity = 2.8;
      sunLight.position.set(14, 25, 12);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.05;
    } else if (lightingMode === 'wireframe') {
      scene.background = new THREE.Color(0x0d1117);
      scene.fog = new THREE.FogExp2(0x0d1117, 0.02);
      sunLight.intensity = 1.0;
    }
  }, [lightingMode, solarHour]);

  // Handle Camera Presets tailored to selected model
  const setCameraView = (preset: CameraPreset) => {
    setCameraPreset(preset);
    const camera = cameraRef.current;
    if (!camera) return;

    if (preset === 'hero') {
      if (selectedModel === 'modular') {
        camera.position.set(-2.0, 5.0, 24.0);
        camera.lookAt(0.6, 2.7, 0);
      } else if (selectedModel === 'travertino') {
        camera.position.set(22, 14, 26);
        camera.lookAt(0, 2.5, 0);
      } else if (selectedModel === 'cristal') {
        camera.position.set(18, 12, 22);
        camera.lookAt(0, 2.2, 0);
      } else {
        camera.position.set(-18, 12, 24);
        camera.lookAt(0, 2.5, 0);
      }
    } else if (preset === 'axonometric') {
      camera.position.set(24, 22, 24);
      camera.lookAt(0.5, 2.2, 0);
    } else if (preset === 'top') {
      camera.position.set(0.1, 38, 0.1);
      camera.lookAt(0, 0, 0);
    } else if (preset === 'facade') {
      camera.position.set(0, 5.0, 26);
      camera.lookAt(0, 2.5, 0);
    } else if (preset === 'entrance') {
      if (selectedModel === 'modular') {
        camera.position.set(3.4, 3.0, 11.5);
        camera.lookAt(2.4, 1.8, 1.2);
      } else if (selectedModel === 'travertino') {
        camera.position.set(6.0, 4.5, 13.0);
        camera.lookAt(4.5, 1.5, 4.2);
      } else if (selectedModel === 'cristal') {
        camera.position.set(-3.0, 4.2, 12.0);
        camera.lookAt(-1.5, 1.5, 3.0);
      } else {
        camera.position.set(-7.8, 3.8, 11.5);
        camera.lookAt(-4.8, 1.5, 3.5);
      }
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0e1011] select-none ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : className
      }`}
    >
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full min-h-[520px] md:min-h-[580px] cursor-grab active:cursor-grabbing" />

      {/* Top Precision Blueprint HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#121314]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#949088]/20 shadow-md">
          <span className="w-2 h-2 bg-emerald-400 rounded-none animate-pulse"></span>
          <span className="font-mono text-xs text-[#f5f0ea] uppercase tracking-wider font-semibold">
            {selectedModel === 'modular'
              ? 'MODULARIDAD PREMIUM · CÁPSULAS OFF-SITE'
              : selectedModel === 'travertino'
              ? 'CASA TRAVERTINO I · POZUELO 850M²'
              : selectedModel === 'cristal'
              ? 'VILLA CRISTAL & AGUA · VALLE DE BRAVO'
              : 'RESIDENCIA DOMÓTICA V · LA MORALEJA'}
          </span>
          <span className="text-[#949088]/40">/</span>
          <span className="font-mono text-[11px] text-[#ccc6bc]">PBR REALISTA 1:50</span>
        </div>

        {/* All 4 Super-Realistic Models Switcher */}
        <div className="pointer-events-auto flex items-center bg-[#121314]/90 backdrop-blur-md p-1 border border-[#949088]/20 shadow-lg">
          <button
            onClick={() => handleSelectModel('modular')}
            className={`px-3 py-1 text-xs uppercase font-medium tracking-wide transition-all ${
              selectedModel === 'modular'
                ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                : 'text-[#cac6bd] hover:text-[#f5f0ea]'
            }`}
          >
            Modularidad (Foto)
          </button>
          <button
            onClick={() => handleSelectModel('travertino')}
            className={`px-3 py-1 text-xs uppercase font-medium tracking-wide transition-all ${
              selectedModel === 'travertino'
                ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                : 'text-[#cac6bd] hover:text-[#f5f0ea]'
            }`}
          >
            Casa Travertino
          </button>
          <button
            onClick={() => handleSelectModel('cristal')}
            className={`px-3 py-1 text-xs uppercase font-medium tracking-wide transition-all ${
              selectedModel === 'cristal'
                ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                : 'text-[#cac6bd] hover:text-[#f5f0ea]'
            }`}
          >
            Villa Cristal & Cascada
          </button>
          <button
            onClick={() => handleSelectModel('domotica')}
            className={`px-3 py-1 text-xs uppercase font-medium tracking-wide transition-all ${
              selectedModel === 'domotica'
                ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                : 'text-[#cac6bd] hover:text-[#f5f0ea]'
            }`}
          >
            Residencia Domótica V
          </button>
        </div>
      </div>

      {/* Floating Yellow Badge for Modularidad Premium */}
      {selectedModel === 'modular' && (
        <div className="absolute top-16 left-4 pointer-events-none z-10 max-w-xs hidden sm:block">
          <div className="bg-amber-400 text-[#121314] px-4 py-2 font-headline font-bold text-xs uppercase tracking-tight shadow-xl border-l-4 border-[#121314]">
            <div>LÍNEAS LIMPIAS</div>
            <div>ALTA DENSIDAD</div>
            <div>ALTAMENTE FLEXIBLES</div>
          </div>
        </div>
      )}

      {/* Lighting & Tectonic Controls Sidebar / Floating HUD */}
      <div className="absolute top-14 sm:top-16 right-3 sm:right-4 z-20 pointer-events-none">
        {!isControlsOpen ? (
          /* Breathing Pulse Floating Button */
          <button
            onClick={() => setIsControlsOpen(true)}
            className="pointer-events-auto flex items-center gap-2.5 bg-[#121314]/95 text-[#f5f0ea] px-3.5 py-2.5 border border-[#f5f0ea]/50 shadow-2xl animate-breathing hover:border-white transition-all cursor-pointer backdrop-blur-md"
            title="Toca para ajustar atmósfera lumínica, despiece y cámaras"
          >
            <span className="material-symbols-outlined text-[19px] text-amber-400">tune</span>
            <div className="flex flex-col text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f5f0ea]">
                Atmósfera & Controles
              </span>
              <span className="font-mono text-[9px] text-[#ccc6bc] -mt-0.5">
                Luz · Despiece · Cámaras
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
          </button>
        ) : (
          /* Expanded Controls Panel with Close Button */
          <div className="pointer-events-auto bg-[#121314]/95 backdrop-blur-md p-3.5 border border-[#949088]/30 shadow-2xl space-y-3 w-72 sm:w-80 max-h-[75vh] overflow-y-auto">
            {/* Header with Title & Hide Button */}
            <div className="flex items-center justify-between pb-2 border-b border-[#949088]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-amber-400">tune</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#f5f0ea]">
                  Controles Tectónicos
                </span>
              </div>
              <button
                onClick={() => setIsControlsOpen(false)}
                className="px-2 py-0.5 bg-[#1f2021] hover:bg-[#292a2b] text-[#cac6bd] hover:text-[#f5f0ea] font-mono text-[10px] uppercase border border-[#949088]/30 flex items-center gap-1 transition-colors cursor-pointer"
                title="Ocultar panel para ver el modelo completo"
              >
                <span>Ocultar</span>
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
            </div>

            {/* Lighting Mode Selector */}
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#ccc6bc] mb-1.5 flex items-center justify-between">
                <span>ATMÓSFERA LUMÍNICA</span>
                <span className="text-[#949088]">{lightingMode.toUpperCase()}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <button
                  onClick={() => setLightingMode('sunset')}
                  className={`px-2 py-1 uppercase text-left transition-colors flex items-center gap-1.5 ${
                    lightingMode === 'sunset'
                      ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                      : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Atardecer Dorado
                </button>
                <button
                  onClick={() => setLightingMode('night')}
                  className={`px-2 py-1 uppercase text-left transition-colors flex items-center gap-1.5 ${
                    lightingMode === 'night'
                      ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                      : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Noche LED
                </button>
                <button
                  onClick={() => setLightingMode('day')}
                  className={`px-2 py-1 uppercase text-left transition-colors flex items-center gap-1.5 ${
                    lightingMode === 'day'
                      ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                      : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-300"></span>
                  Luz Solar Diurna
                </button>
                <button
                  onClick={() => setLightingMode('wireframe')}
                  className={`px-2 py-1 uppercase text-left transition-colors flex items-center gap-1.5 ${
                    lightingMode === 'wireframe'
                      ? 'bg-[#f5f0ea] text-[#121314] font-semibold'
                      : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Rayos-X Estructural
                </button>
              </div>
            </div>

            {/* Exploded View Slider */}
            <div className="pt-2 border-t border-[#949088]/20">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#ccc6bc] mb-1">
                <span>DESPIECE TECTÓNICO</span>
                <span className="text-[#f5f0ea]">{Math.round(explodedAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={explodedAmount}
                onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
                className="w-full accent-[#d8d4ce] h-1.5 bg-[#292a2b] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#949088] font-mono mt-0.5">
                <span>Compacto</span>
                <span>Despiece Flotante</span>
              </div>
            </div>

            {/* Camera Presets */}
            <div className="pt-2 border-t border-[#949088]/20">
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#ccc6bc] mb-1.5">
                ENFOQUE DE CÁMARA
              </div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setCameraView('hero')}
                  className={`px-2 py-0.5 text-[10px] uppercase transition-colors ${
                    cameraPreset === 'hero' ? 'bg-[#f5f0ea] text-[#121314] font-bold' : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  Perspectiva Principal
                </button>
                <button
                  onClick={() => setCameraView('entrance')}
                  className={`px-2 py-0.5 text-[10px] uppercase transition-colors ${
                    cameraPreset === 'entrance' ? 'bg-[#f5f0ea] text-[#121314]' : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  Detalle Acceso
                </button>
                <button
                  onClick={() => setCameraView('axonometric')}
                  className={`px-2 py-0.5 text-[10px] uppercase transition-colors ${
                    cameraPreset === 'axonometric' ? 'bg-[#f5f0ea] text-[#121314]' : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  Axon 45°
                </button>
                <button
                  onClick={() => setCameraView('top')}
                  className={`px-2 py-0.5 text-[10px] uppercase transition-colors ${
                    cameraPreset === 'top' ? 'bg-[#f5f0ea] text-[#121314]' : 'bg-[#1f2021] text-[#cac6bd] hover:bg-[#292a2b]'
                  }`}
                >
                  Planta Cenital
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap items-end justify-between gap-3 pointer-events-none z-10">
        <div className="pointer-events-auto bg-[#121314]/90 backdrop-blur-md px-3 py-1.5 border border-[#949088]/20 flex items-center gap-3 text-xs font-mono text-[#cac6bd]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400"></span>
            <span>THREE.JS ARCHITECTURAL ENGINE</span>
          </div>
          <span className="text-[#949088]">/</span>
          <span>
            {selectedModel === 'modular'
              ? 'GFRC BLANCO + ROBLE TERMOTRATADO + CRISTAL TRIPLE'
              : selectedModel === 'travertino'
              ? 'TRAVERTINO ROMANO 8CM + OLIVO ESCULTÓRICO'
              : selectedModel === 'cristal'
              ? 'CASCADA LAMINAR + PISCINA ESPEJO + CRISTAL 32MM'
              : 'COMPOSITE GRAFITO MATE + ESCALERA VOLADA LED'}
          </span>
          <span className="text-[#949088]">/</span>
          <span className="text-[#f5f0ea]">SOMBRAS PCF 2048²</span>
        </div>

        {/* Viewport Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#121314]/90 backdrop-blur-md p-1 border border-[#949088]/20">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono transition-colors ${
              isRotating ? 'bg-[#f5f0ea] text-[#121314] font-semibold' : 'text-[#cac6bd] hover:text-[#f5f0ea]'
            }`}
            title="Pausar o activar rotación automática"
          >
            {isRotating ? 'Giro 360° Activo' : 'Giro Pausado'}
          </button>
          <button
            onClick={() => setCameraView('hero')}
            className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono text-[#cac6bd] hover:text-[#f5f0ea] transition-colors"
            title="Restablecer a la vista principal"
          >
            Resetear Vista
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono text-[#cac6bd] hover:text-[#f5f0ea] transition-colors"
            title="Pantalla completa"
          >
            {isFullscreen ? 'Salir Fullscreen' : 'Pantalla Completa'}
          </button>
          <div className="hidden md:flex items-center gap-1 text-[11px] text-[#949088] px-2 font-mono">
            <span>Arrastre para orbitar · Scroll zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
};
