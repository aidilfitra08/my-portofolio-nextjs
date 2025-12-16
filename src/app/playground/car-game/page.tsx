"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function CarGamePage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 50, 200);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Ground segments
    const groundSegments: THREE.Mesh[] = [];
    const segmentSize = 200;
    const numSegments = 5;

    const createGroundSegment = (zPosition: number) => {
      const groundGeometry = new THREE.PlaneGeometry(200, segmentSize);
      const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.z = zPosition;
      ground.receiveShadow = true;
      scene.add(ground);
      return ground;
    };

    for (let i = 0; i < numSegments; i++) {
      const segment = createGroundSegment(i * segmentSize - segmentSize * 2);
      groundSegments.push(segment);
    }

    // Road segments
    const roadSegments: THREE.Mesh[] = [];

    const createRoadSegment = (zPosition: number) => {
      const roadGeometry = new THREE.PlaneGeometry(10, segmentSize);
      const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x404040 });
      const road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.position.y = 0.01;
      road.position.z = zPosition;
      road.receiveShadow = true;
      scene.add(road);
      return road;
    };

    for (let i = 0; i < numSegments; i++) {
      const segment = createRoadSegment(i * segmentSize - segmentSize * 2);
      roadSegments.push(segment);
    }

    // Road lines
    const roadLines: THREE.Mesh[] = [];

    const createRoadLines = (zPosition: number) => {
      const lines: THREE.Mesh[] = [];
      for (let i = 0; i < segmentSize / 10; i++) {
        const lineGeometry = new THREE.PlaneGeometry(0.5, 5);
        const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.rotation.x = -Math.PI / 2;
        line.position.set(0, 0.02, zPosition + i * 10);
        scene.add(line);
        lines.push(line);
      }
      return lines;
    };

    for (let i = 0; i < numSegments; i++) {
      const lines = createRoadLines(
        i * segmentSize - segmentSize * 2 - segmentSize / 2
      );
      roadLines.push(...lines);
    }

    // Create car
    const carGroup = new THREE.Group();

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    carGroup.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(1.6, 0.8, 2);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0xcc0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 1.4, -0.3);
    roof.castShadow = true;
    carGroup.add(roof);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });

    const wheelPositions = [
      [-1.2, 0.4, 1.2],
      [1.2, 0.4, 1.2],
      [-1.2, 0.4, -1.2],
      [1.2, 0.4, -1.2],
    ];

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;
      carGroup.add(wheel);
    });

    carGroup.position.set(0, 0, 0);
    scene.add(carGroup);

    // Trees
    const trees: Array<{ group: THREE.Group; initialZ: number }> = [];

    const createTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group();

      const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 3, 6);
      const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 1.5;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const leavesGeometry = new THREE.ConeGeometry(2, 4, 6);
      const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.y = 4.5;
      leaves.castShadow = true;
      treeGroup.add(leaves);

      treeGroup.position.set(x, 0, z);
      scene.add(treeGroup);

      return { group: treeGroup, initialZ: z };
    };

    // Initial trees
    for (let i = 0; i < 30; i++) {
      const x =
        Math.random() > 0.5
          ? Math.random() * 40 + 15
          : Math.random() * -40 - 15;
      const z = Math.random() * 400 - 200;
      trees.push(createTree(x, z));
    }

    // Camera position
    camera.position.set(0, 8, 15);
    camera.lookAt(carGroup.position);

    // Controls
    const keys: { [key: string]: boolean } = {};

    const onKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Game variables
    let carSpeed = 0;
    const maxSpeed = 0.5;
    const acceleration = 0.01;
    const deceleration = 0.005;
    let rotation = 0;
    let totalDistance = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Car controls
      if (keys["arrowup"] || keys["w"]) {
        carSpeed = Math.min(carSpeed + acceleration, maxSpeed);
      } else if (keys["arrowdown"] || keys["s"]) {
        carSpeed = Math.max(carSpeed - acceleration, -maxSpeed * 0.5);
      } else {
        if (carSpeed > 0) {
          carSpeed = Math.max(0, carSpeed - deceleration);
        } else if (carSpeed < 0) {
          carSpeed = Math.min(0, carSpeed + deceleration);
        }
      }

      if (keys["arrowleft"] || keys["a"]) {
        rotation += 0.03;
      }
      if (keys["arrowright"] || keys["d"]) {
        rotation -= 0.03;
      }

      carGroup.rotation.y = rotation;

      const moveX = Math.sin(rotation) * carSpeed;
      const moveZ = Math.cos(rotation) * carSpeed;

      carGroup.position.x += moveX;
      carGroup.position.z -= moveZ;

      // Keep car horizontally bounded
      carGroup.position.x = Math.max(-95, Math.min(95, carGroup.position.x));

      totalDistance += Math.abs(carSpeed);

      // Update ground segments for endless road
      groundSegments.forEach((segment) => {
        if (segment.position.z > carGroup.position.z + 200) {
          segment.position.z -= segmentSize * numSegments;
        }
      });

      // Update road segments
      roadSegments.forEach((segment) => {
        if (segment.position.z > carGroup.position.z + 200) {
          segment.position.z -= segmentSize * numSegments;
        }
      });

      // Update road lines
      roadLines.forEach((line) => {
        if (line.position.z > carGroup.position.z + 200) {
          line.position.z -= segmentSize * numSegments;
        }
      });

      // Update trees for endless movement
      trees.forEach((tree) => {
        const relativeZ = tree.group.position.z - carGroup.position.z;
        if (relativeZ > 200) {
          tree.group.position.z -= 400;
          tree.group.position.x =
            Math.random() > 0.5
              ? Math.random() * 40 + 15
              : Math.random() * -40 - 15;
        }
      });

      // Update camera to follow car
      camera.position.x = carGroup.position.x - Math.sin(rotation) * 15;
      camera.position.z = carGroup.position.z + Math.cos(rotation) * 15;
      camera.position.y = carGroup.position.y + 8;
      camera.lookAt(carGroup.position);

      setSpeed(Math.abs(carSpeed * 200));
      setDistance(totalDistance * 10);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Controls</h2>
        <p>↑/W - Forward</p>
        <p>↓/S - Backward</p>
        <p>←/A - Turn Left</p>
        <p>→/D - Turn Right</p>
        <p className="mt-2">Speed: {speed.toFixed(0)} km/h</p>
        <p>Distance: {distance.toFixed(0)}m</p>
      </div>
      <div className="absolute bottom-6 right-4 bg-black/20 bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Vibe Code</h2>
      </div>
    </div>
  );
}
