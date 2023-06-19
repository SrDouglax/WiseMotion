import { ComponentTypes, ObjectComponentTypes, WorldObject } from "../../EditorTypes";
import "./Inspector.scss";

// import { MdPlayArrow, MdStop } from "react-icons/md";

interface InspectorProps {
  WorldObjects: WorldObject[];
}

function Inspector({ WorldObjects }: InspectorProps) {
  const components = WorldObjects[0].components;
  const componentsName = Object.keys(components);

  const componentsFieldsName = componentsName.map((comp) => {
    return Object.keys((components as any)[comp as ComponentTypes] as any).slice(1);
  });
  console.log(componentsFieldsName);

  const CompFields = {
    size: () => {
      return (
        <div className="sizeField">
          <p className="fieldName">Tamanho</p>
          <div className="inputs">
            <p>W</p>
            <input type="number" className="w" />
            <p>H</p>
            <input type="number" className="h" />
          </div>
        </div>
      );
    },
    vec2: () => {
      return (
        <div className="sizeField">
          <p className="fieldName">Vetor</p>
          <div className="inputs">
            <p>X</p>
            <input type="number" className="w" />
            <p>Y</p>
            <input type="number" className="h" />
          </div>
        </div>
      );
    },
    color: () => {
      return (
        <div className="sizeField">
          <p className="fieldName">Cor</p>
          <div className="inputs">
            <div className="color">
              <input type="color" className="colorSelector" />
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="inspector">
      <h2 className="title">Inspetor de componentes</h2>
      {componentsName.map((componentName, i) => (
        <div className="component" key={componentName}>
          <p className="componentName textNoBreak">
            {components?.[componentName as ComponentTypes]?.name}
          </p>
          {componentsFieldsName[i].map((field) => {
            return (CompFields as any)[field]?.();
          })}
        </div>
      ))}
    </div>
  );
}

export default Inspector;
