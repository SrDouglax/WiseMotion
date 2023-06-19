import { useEffect, useState } from "react";
import "./Editor.scss";

import { PublicApi, useBox } from "@react-three/cannon";
import Inspector from "./components/inspector/Inspector";
import Simulation from "./components/simulation/Simulation";
import { WorldObject, RectProps } from "./EditorTypes";

function Editor() {
  const [isPaused, setIsPaused] = useState(true);
  const [WorldObjects] = useState<WorldObject[]>([
    {
      name: "WorldObject",
      type: "rect",
      components: {
        rect: { name: "Retangulo", size: { w: 1, h: 1 }, color: "#f44" },
        positionXY: { name: "Posição", vec2: {x: -4, y: -2.5} },
        velocityXY: { name: "Velocidade por XY", vec2: {x: 0.5, y: undefined}, fixed: true },
      },
    },
    {
      name: "WorldssObject",
      type: "rect",
      components: {
        rect: {
          name: "Retangulo",
          size: { w: 100, h: 2 },
          color: "#3a3",
          moviment: "Static",
        },
        positionXY: { name: "Posição", vec2: {x: 0, y: -4} },
      },
    },
  ]);

  let elementsApi: PublicApi[] = [];

  /**
   * Component that represents a 2D rectangle.
   * @param {RectProps} Props - Rectangle properties.
   * @returns {JSX.Element} JSX element representing the rectangle.
   */
  function Rect({ Props, PhisProps, GeoProps, MatProps }: RectProps): JSX.Element {
    const [w, h] = [Props?.w || 1, Props?.h || 1];
    const [ref, api] = useBox(() => ({
      mass: 1,
      linearFactor: [1, 1, 0],
      angularFactor: [0, 0, 1],
      args: [w, h, 1],
      ...PhisProps,
    }));

    elementsApi.push(api);

    return (
      <mesh ref={ref}>
        <planeGeometry args={[w, h]} {...GeoProps} />
        <meshBasicMaterial color="#f00" {...MatProps} />
      </mesh>
    );
  }

  /**
   * Initializes the resizer functionality for resizing elements.
   * @param resizer The resizer element.
   * @param element The element to be resized.
   * @param inverted Determines if the resizing should be inverted.
   */
  function initResizer(resizer: HTMLElement, element: HTMLElement, inverted?: boolean) {
    var x = 0,
      w = 0;

    function r_mousedownHandler(e: MouseEvent) {
      x = e.clientX;
      w = parseInt(window.getComputedStyle(element).width);
      document.addEventListener("mousemove", r_mousemoveHandler);
      document.addEventListener("mouseup", r_mouseupHandler);
    }

    function r_mousemoveHandler(e: MouseEvent) {
      var dx = w + (e.clientX - x) * (inverted ? -1 : 1);
      element.style.width = `${dx}px`;
    }
    function r_mouseupHandler() {
      document.removeEventListener("mouseup", r_mouseupHandler);
      document.removeEventListener("mousedown", r_mousedownHandler);
      document.removeEventListener("mousemove", r_mousemoveHandler);
    }

    resizer.addEventListener("mousedown", r_mousedownHandler);
  }

  // Set the resizers
  useEffect(() => {
    initResizer(
      document.querySelector(".resizer1") as HTMLElement,
      document.querySelector(".objects") as HTMLElement
    );
    initResizer(
      document.querySelector(".resizer2") as HTMLElement,
      document.querySelector(".inspector") as HTMLElement,
      true
    );
  }, []);

  // Set constant values
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        WorldObjects.forEach((worldObject, i) => {
          if (worldObject.components.velocityXY?.fixed) {
            let currentVelocity = [0, 0, 0];
            const unsub = elementsApi[i].velocity.subscribe((value) => {
              currentVelocity = value;
            });
            console.log(worldObject?.components?.velocityXY?.vec2.y || currentVelocity[1]);

            elementsApi[i].velocity.set(
              worldObject?.components?.velocityXY?.vec2.x || currentVelocity[0],
              worldObject?.components?.velocityXY?.vec2.y || currentVelocity[1],
              0
            );
            unsub();
          }
        });
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="App">
      <div className="header"></div>
      <div className="content">
        <div className="objects"></div>
        <div className="resizer1"></div>
        <Simulation
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          WorldObjects={WorldObjects}
          Rect={Rect}
        />
        <div className="resizer2"></div>
        <Inspector WorldObjects={WorldObjects}/>
      </div>
    </div>
  );
}

export default Editor;
