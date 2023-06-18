import "./SimulationActionbar.scss";

import { MdPlayArrow, MdStop } from "react-icons/md";

function SimulationActionbar({ isPaused, setIsPaused }: { isPaused: boolean; setIsPaused: Function }) {
  return (
    <div className="actionbar">
      <div className="playButton">
        {isPaused ? (
          <MdPlayArrow
            className="play"
            onClick={() => {
              setIsPaused((old: boolean) => !old);
            }}
          />
        ) : (
          <MdStop
            className="stop"
            onClick={() => {
              setIsPaused((old: boolean) => !old);
              
            }}
          />
        )}
      </div>
      {/* <div className="nextInteration" onClick={() => {setInterations((old) => { console.log(physicsRef); return 0})}}>
              <MdNavigateNext/>
            </div> */}
    </div>
  );
}

export default SimulationActionbar;
