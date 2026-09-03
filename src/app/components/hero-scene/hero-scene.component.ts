import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { CONSTELLATION_NODES } from '../../core/data/resume.data';
import { ConstellationNode } from '../../core/models/resume.model';
import { ScrollSpyService } from '../../services/scroll-spy.service';

interface SceneNode {
  data: ConstellationNode;
  mesh: THREE.Mesh;
}

const CLUSTER_COLOR: Record<ConstellationNode['cluster'], number> = {
  core: 0xf2c572,
  banking: 0x4f8fe8,
  telecom: 0x8f6fe8,
  energy: 0xe2793c,
};

/**
 * Signature visual: a "Micro-Frontend Constellation" — each orbiting node is a real
 * module/client Ketaki has shipped (Citi Olympus MFEs, ATLAS, Reliance Trade Platform,
 * RBL Video KYC). The architecture pattern she builds for a living becomes the hero.
 */
@Component({
  selector: 'kk-hero-scene',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-scene.component.html',
  styleUrl: './hero-scene.component.scss',
})
export class HeroSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasHost', { static: true }) canvasHost!: ElementRef<HTMLDivElement>;

  readonly hoveredNode = signal<ConstellationNode | null>(null);
  readonly ready = signal(false);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private group?: THREE.Group;
  private nodes: SceneNode[] = [];
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2(-10, -10);
  private targetRotation = { x: 0, y: 0 };
  private currentRotation = { x: 0, y: 0 };
  private frameId = 0;
  private resizeObserver?: ResizeObserver;

  constructor(private scrollSpy: ScrollSpyService) {
    // Gentle parallax tilt tied to page scroll progress (signals -> effect -> imperative three.js).
    effect(() => {
      const progress = this.scrollSpy.scrollProgress();
      this.targetRotation.x = -0.15 + progress * 0.5;
    });
  }

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    this.ready.set(true);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.renderer?.dispose();
  }

  onPointerMove(event: PointerEvent): void {
    const host = this.canvasHost.nativeElement;
    const rect = host.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.targetRotation.y = this.pointer.x * 0.35;
    this.targetRotation.x = -0.15 + this.pointer.y * -0.15;

    this.checkHover();
  }

  onPointerLeave(): void {
    this.pointer.set(-10, -10);
    this.hoveredNode.set(null);
  }

  private initScene(): void {
    const host = this.canvasHost.nativeElement;
    const width = host.clientWidth;
    const height = host.clientHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 9);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.buildConstellation();
    this.buildLighting();
    this.buildAmbientField();

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(host);
  }

  private buildLighting(): void {
    const key = new THREE.PointLight(0x4f8fe8, 60, 20);
    key.position.set(4, 3, 6);
    const fill = new THREE.PointLight(0xf2c572, 30, 20);
    fill.position.set(-4, -2, 4);
    const ambient = new THREE.AmbientLight(0x33465c, 1.2);
    this.scene!.add(key, fill, ambient);
  }

  /** Faint drifting points behind the constellation for depth, styled as data particles. */
  private buildAmbientField(): void {
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x3f5470,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const field = new THREE.Points(geometry, material);
    this.scene!.add(field);
  }

  private buildConstellation(): void {
    const [core, ...satellites] = CONSTELLATION_NODES;
    const clusters: Record<string, ConstellationNode[]> = {};
    for (const n of satellites) {
      (clusters[n.cluster] ??= []).push(n);
    }

    // Core node
    const coreMesh = this.makeNodeMesh(core, 0.34);
    coreMesh.position.set(0, 0, 0);
    this.group!.add(coreMesh);
    this.nodes.push({ data: core, mesh: coreMesh });

    const clusterKeys = Object.keys(clusters);
    const clusterRadius = 3.1;

    clusterKeys.forEach((clusterKey, ci) => {
      const clusterAngle = (ci / clusterKeys.length) * Math.PI * 2;
      const clusterCenter = new THREE.Vector3(
        Math.cos(clusterAngle) * clusterRadius,
        Math.sin(clusterAngle) * clusterRadius * 0.55,
        Math.sin(clusterAngle * 1.3) * 1.4,
      );

      const members = clusters[clusterKey];
      members.forEach((node, ni) => {
        const localAngle = (ni / Math.max(members.length, 1)) * Math.PI * 2;
        const localRadius = 0.75;
        const pos = new THREE.Vector3(
          clusterCenter.x + Math.cos(localAngle) * localRadius,
          clusterCenter.y + Math.sin(localAngle) * localRadius,
          clusterCenter.z + Math.sin(localAngle * 0.7) * 0.5,
        );

        const mesh = this.makeNodeMesh(node, 0.17);
        mesh.position.copy(pos);
        this.group!.add(mesh);
        this.nodes.push({ data: node, mesh });

        // edge: node -> core
        this.addEdge(pos, new THREE.Vector3(0, 0, 0), CLUSTER_COLOR[node.cluster]);
      });

      // edge: cluster center anchor -> core (structural line, faint)
      this.addEdge(clusterCenter, new THREE.Vector3(0, 0, 0), 0x2c3b4f, 0.25);
    });
  }

  private makeNodeMesh(node: ConstellationNode, radius: number): THREE.Mesh {
    const geometry = new THREE.IcosahedronGeometry(radius, node.cluster === 'core' ? 2 : 1);
    const material = new THREE.MeshStandardMaterial({
      color: CLUSTER_COLOR[node.cluster],
      emissive: CLUSTER_COLOR[node.cluster],
      emissiveIntensity: node.cluster === 'core' ? 0.55 : 0.3,
      roughness: 0.35,
      metalness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData['node'] = node;
    return mesh;
  }

  private addEdge(from: THREE.Vector3, to: THREE.Vector3, color: number, opacity = 0.55): void {
    const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const line = new THREE.Line(geometry, material);
    this.group!.add(line);
  }

  private checkHover(): void {
    if (!this.camera) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const meshes = this.nodes.map((n) => n.mesh);
    const hits = this.raycaster.intersectObjects(meshes);
    if (hits.length > 0) {
      const hit = this.nodes.find((n) => n.mesh === hits[0].object);
      this.hoveredNode.set(hit?.data ?? null);
      document.body.style.cursor = 'pointer';
    } else {
      this.hoveredNode.set(null);
      document.body.style.cursor = 'default';
    }
  }

  private onResize(): void {
    if (!this.renderer || !this.camera) return;
    const host = this.canvasHost.nativeElement;
    const width = host.clientWidth;
    const height = host.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate = (): void => {
    this.frameId = requestAnimationFrame(this.animate);
    if (!this.group || !this.renderer || !this.scene || !this.camera) return;

    // Ease current rotation toward target (pointer / scroll driven).
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.04;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.04;

    this.group.rotation.x = this.currentRotation.x;
    this.group.rotation.y += 0.0016 + (this.targetRotation.y - this.currentRotation.y) * 0.0005;

    // Subtle pulse on the core node.
    const core = this.nodes[0]?.mesh;
    if (core) {
      const scale = 1 + Math.sin(performance.now() * 0.0016) * 0.04;
      core.scale.setScalar(scale);
    }

    this.renderer.render(this.scene, this.camera);
  };
}
