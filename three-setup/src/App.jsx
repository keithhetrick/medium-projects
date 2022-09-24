import { useEffect } from 'react'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

function App() {

  useEffect(() => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z = 96

    const canvas = document.getElementById('myThreeJsCanvas')
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    ambientLight.castShadow = true
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 1)
    spotLight.castShadow = true
    spotLight.position.set(0, 64, 32)
    scene.add(spotLight)

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16)
    const boxMaterial = new THREE.MeshNormalMaterial()
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(boxMesh)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)

    // Add FPS stats
    const stats = Stats()
    document.body.appendChild(stats.dom)

    // Text Loading
    // const loader = new THREE.FontLoader()

    // loader.load("./fonts/Cascadia_Code_Regular.json", function (font) {
    //   const geometry = new THREE.TextGeometry('Hi.\nHow are you?', {
    //     font: font,
    //     size: 6,
    //     height: 2,
    //   })
    //   const textMesh = new THREE.Mesh(geometry, 
    //     [new THREE.MeshPhongMaterial({ color: 0xad4000 }), // front
    //     new THREE.MeshPhongMaterial({ color: 0x5c2301 }) // side
    //   ] )

    //   textMesh.castShadow = true
    //   textMesh.position.y += 15
    //   textMesh.position.z -= 40
    //   textMesh.position.x -= -8
    //   textMesh.position.y -= -0.50
    // })

    // Animate
    const animate = () => {
      boxMesh.rotation.x += 0.01
      boxMesh.rotation.y += 0.01
      stats.update()
      controls.update()
      renderer.render(scene, camera)
      window.requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <div>
      <canvas id='myThreeJsCanvas'>hi there</canvas>
    </div>
  )
}

export default App
