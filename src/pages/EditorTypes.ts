import { BoxProps } from "@react-three/cannon";
import { PlaneGeometryProps, MeshBasicMaterialProps } from "@react-three/fiber";

type RectPropsType = {
  w: number;
  h: number;
};

export interface RectProps {
  Props?: RectPropsType;
  PhisProps?: BoxProps;
  GeoProps?: PlaneGeometryProps;
  MatProps?: MeshBasicMaterialProps;
}

type WorldObjectType = "rect" | "circle";

export interface RectComponent {
  color?: string;
  moviment?: "Dynamic" | "Static";
  size?: {
    w?: number;
    h?: number;
  };
}

export interface PositionComponent {
  x?: number;
  y?: number;
  fixed?: boolean;
}

export interface VelocityByXYComponent {
  x?: number;
  y?: number;
  fixed?: boolean;
}

export interface AcelerationByXYComponent {
  x?: number;
  y?: number;
  fixed?: boolean;
}

export interface AcelerationByAngleComponent {
  angle?: number;
  fixed?: boolean;
}

// type ObjectComponentTypes =
//   | RectComponent
//   | PositionComponent
//   | AcelerationByXYComponent
//   | AcelerationByXYComponent
//   | AcelerationByAngleComponent;

export interface ObjectComponents {
  rect?: RectComponent;
  positionXY?: PositionComponent;
  velocityXY?: VelocityByXYComponent;
  AcelerationXY?: AcelerationByXYComponent;
  AcelerationAngle?: AcelerationByAngleComponent;
}

export interface WorldObject {
  name: string;
  type: WorldObjectType;
  components: ObjectComponents;
}
