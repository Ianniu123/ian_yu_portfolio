import RenderSolarSystem from "../components/RenderSolarSystem";
import Overlay from "../components/UI/Overlay";

export default function Home() {
  return (
    <div className="w-screen">
      <div className="relative w-screen h-screen">
        <RenderSolarSystem />
        <Overlay />
      </div>
    </div>
  );
}