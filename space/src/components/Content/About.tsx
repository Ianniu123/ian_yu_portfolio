"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function PsyduckModel() {
  const { scene } = useGLTF("/meshes/psyduck.glb");
  return <primitive object={scene} />;
}

// Preload the model to minimize pop-in on first render
useGLTF.preload("/meshes/psyduck.glb");

const About = () => {
  return (
    <>
      <div className="panel-content">
        <div className="flex-1">
          <Canvas
            camera={{ position: [-5, 0, 5], fov: 50}}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance"}}
          >
            {/* Basic lighting for the model */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />

            {/* Center and scale the model nicely in view */}
            <Center>
              <group position={[0, -0.5, 0]} scale={1}>
                <PsyduckModel />
              </group>
            </Center>

            {/* Gentle autorotation; no zoom/pan to keep layout stable */}
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </div>
        <div className="flex-2">
          <p className="welcome-text">
            Hi I am Ian.
          </p>
          <p className="description">
            I’m a 3rd year Computer Science student from Carleton University interested in building technology that once 
            lived only in science fiction to empower humanity. My inspirations mainly came from films that I have watched or books that I have
            read in the past, including but not limited to: Jarvis from Ironman, TARS from Interstellar, T-800 from Terminator <span className="unnormal-text">(in a good way of course).</span>
            <br/>
            <br/>
            Outside of tech, You’ll find me gaming, swimming, hitting the gym, diving into books, or getting lost in music. 
            I’m also a huge fan of history and geopolitics — I watch everything from deep-dive documentaries to fast-paced explainers.
          </p>
          <br></br>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/yu-zhiyao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href="https://github.com/Ianniu123"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <FaGithub size={40} />
            </a>
          </div>
        </div>
        
      </div>
    </>
  ) 
}

export default About