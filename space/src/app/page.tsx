import RenderSolarSystem from "../components/RenderSolarSystem";
import Overlay from "../components/UI/Overlay";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
          <div className="absolute top-0 left-0 h-screen w-screen z-0">
            <RenderSolarSystem />
          </div>
          
          <div className="z-10">
           <Overlay /> 
          </div>
    </div>
  );
}