import { ComponentTypes, FieldTypes, WorldObject } from "../../EditorTypes";
import "./Inspector.scss";

// import { MdPlayArrow, MdStop } from "react-icons/md";

interface InspectorProps {
  WorldObjects: WorldObject[];
  setWorldObjects: React.Dispatch<React.SetStateAction<WorldObject[]>>;
}

function Inspector({ WorldObjects, setWorldObjects }: InspectorProps) {
  const components = WorldObjects[0].components;
  const componentsName = Object.keys(components);

  const componentsFieldsName = componentsName.map((comp) => {
    return Object.keys((components as any)[comp as ComponentTypes] as any).slice(1);
  });

  const CompFields = {
    size: (compName: ComponentTypes, field: string) => {
      return (
        <div className="sizeField" key={field}>
          <p className="fieldName">Tamanho</p>
          <div className="inputs">
            <p>W</p>
            <input
              type="number"
              className="w"
              onMouseEnter={(e) => {
                e.currentTarget.focus();
              }}
              onChange={(e) =>
                setFieldValue(
                  setWorldObjects,
                  WorldObjects,
                  0,
                  compName,
                  "size",
                  e.currentTarget.value,
                  "w",
                  true
                )
              }
            />
            <p>H</p>
            <input
              type="number"
              className="h"
              onMouseEnter={(e) => {
                e.currentTarget.focus();
              }}
              onChange={(e) =>
                setFieldValue(
                  setWorldObjects,
                  WorldObjects,
                  0,
                  compName,
                  "size",
                  e.currentTarget.value,
                  "h",
                  true
                )
              }
            />
          </div>
        </div>
      );
    },
    vec2: (compName: ComponentTypes, field: string) => {
      return (
        <div className="sizeField" key={field}>
          <p className="fieldName">Vetor</p>
          <div className="inputs">
            <p>X</p>
            <input
              type="number"
              className="w"
              onMouseEnter={(e) => {
                e.currentTarget.focus();
              }}
              onChange={(e) =>
                setFieldValue(
                  setWorldObjects,
                  WorldObjects,
                  0,
                  compName,
                  "vec2",
                  e.currentTarget.value,
                  "x",
                  true
                )
              }
            />
            <p>Y</p>
            <input
              type="number"
              className="h"
              onMouseEnter={(e) => {
                e.currentTarget.focus();
              }}
              onChange={(e) =>
                setFieldValue(
                  setWorldObjects,
                  WorldObjects,
                  0,
                  compName,
                  "vec2",
                  e.currentTarget.value,
                  "y",
                  true
                )
              }
            />
          </div>
        </div>
      );
    },
    color: (compName: ComponentTypes, field: string) => {
      return (
        <div className="sizeField" key={field}>
          <p className="fieldName">Cor</p>
          <div className="inputs">
            <div className="color">
              <input
                type="color"
                className="colorSelector"
                onBlur={(e) =>
                  setFieldValue(
                    setWorldObjects,
                    WorldObjects,
                    0,
                    compName,
                    "color",
                    e.currentTarget.value
                  )
                }
              />
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
            return (CompFields as any)[field]?.(componentName, field);
          })}
        </div>
      ))}
    </div>
  );
}

export default Inspector;

function setFieldValue(
  setWorldObjects: React.Dispatch<React.SetStateAction<WorldObject[]>>,
  WorldObjects: WorldObject[],
  objIndex: number,
  compName: ComponentTypes,
  field: FieldTypes,
  value: any,
  property?: any,
  isNumber?: boolean
) {
  const newValue = [...WorldObjects]; // Copy the WorldObjects array to a new array

  const rectComponent = newValue[objIndex]?.components[compName];

  if (isNumber) {
    value = parseFloat(value);
  }

  if (rectComponent && (rectComponent as any)[field]) {
    if (property) {
      (rectComponent as any)[field][property] = value; // Update the specified field value
    } else {
      (rectComponent as any)[field] = value; // Update the specified field value
    }
  }

  setWorldObjects(newValue); // Update the WorldObjects state
}
