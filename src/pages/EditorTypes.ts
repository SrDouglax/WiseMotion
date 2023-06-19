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
  name: "Retangulo";
  color?: string;
  moviment?: "Dynamic" | "Static";
  size?: {
    w?: number;
    h?: number;
  };
}

export interface PositionComponent {
  name: "Posição";
  vec2: {
    x?: number;
    y?: number;
  }
  fixed?: boolean;
}

export interface VelocityByXYComponent {
  name: "Velocidade por XY";
  vec2: {
    x?: number;
    y?: number;
  }
  fixed?: boolean;
}

export interface AccelerationByXYComponent {
  name: 'Aceleração por XY';
  x?: number;
  y?: number;
  fixed?: boolean;
}

export interface AccelerationByAngleComponent {
  name: "Aceleração por Angulo";
  angle?: number;
  fixed?: boolean;
}

export type ObjectComponentTypes =
  | RectComponent
  | PositionComponent
  | AccelerationByXYComponent
  | AccelerationByXYComponent
  | AccelerationByAngleComponent;

export type ComponentTypes = 'rect' | 'positionXY' | 'velocityXY' | 'AccelerationXY' | 'AccelerationAngle'
export interface ObjectComponents {
  rect?: RectComponent;
  positionXY?: PositionComponent;
  velocityXY?: VelocityByXYComponent;
  AccelerationXY?: AccelerationByXYComponent;
  AccelerationAngle?: AccelerationByAngleComponent;
}

export interface WorldObject {
  name: string;
  type: WorldObjectType;
  components: ObjectComponents;
}
