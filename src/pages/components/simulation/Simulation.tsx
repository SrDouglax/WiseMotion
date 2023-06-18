import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import "./Simulation.scss";
import SimulationActionbar from "./actionbar/SimulationActionbar";
import { WorldObject, RectProps } from "../../EditorTypes";

// import { MdPlayArrow, MdStop } from "react-icons/md";

interface SimulationProps {
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  WorldObjects: WorldObject[];
  Rect: (Props: RectProps) => JSX.Element;
}

function Simulation({isPaused, setIsPaused, WorldObjects, Rect}:SimulationProps) {
  return (
    <div className="simulation">
      <div className="simulationCanvas">
        <Canvas>
          <Physics gravity={[0, -10, 0]} isPaused={isPaused} size={10}>
            {WorldObjects.map((e: any) => {
              return (
                <Rect
                  key={e.name}
                  Props={{
                    w: e.components.rect?.size?.w || 1,
                    h: e.components.rect?.size?.h || 1,
                  }}
                  PhisProps={{
                    position: [
                      e.components.positionXY?.x || 0,
                      e.components.positionXY?.y || 0,
                      0,
                    ],
                    type: e.components.rect?.moviment || "Dynamic",
                  }}
                  MatProps={{ color: e.components.rect?.color }}
                />
              );
            })}
          </Physics>
        </Canvas>
      </div>
      <div className="actionbar">
        <SimulationActionbar
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        ></SimulationActionbar>
      </div>
    </div>
  );
}

export default Simulation;
