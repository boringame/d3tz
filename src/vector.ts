

const { sin, cos, } = Math;


export const vectorDimX = 0;
export const vectorDimY = 1;
export const vectorDimZ = 2;

export const vectorMin = Number.MIN_SAFE_INTEGER;

/**
 * 立体位置
 */
export type Vector = [x: number, y: number, z: number];

/**
 * 法向量
 */
export type NormalVector = [x: number, y: number, z: number];


export const vectorRotateZ = (point: Vector, deg: number) => {
  const degP = deg * Math.PI / 180;
  const degPSin = sin(degP);
  const degPCos = cos(degP);

  const x = point[vectorDimX];
  const y = point[vectorDimY];
  const z = point[vectorDimZ];

  const rsX = degPCos * x - degPSin * y;
  const rsY = degPSin * x + degPCos * y;
  const rsZ = z;

  const rsPoint: Vector = [rsX, rsY, rsZ];
  return rsPoint;
};

export const vectorRotateY = (point: Vector, deg: number) => {
  const degP = deg * Math.PI / 180;
  const degPSin = sin(degP);
  const degPCos = cos(degP);

  const x = point[vectorDimX];
  const y = point[vectorDimY];
  const z = point[vectorDimZ];

  const rsX = degPCos * x + degPSin * z;
  const rsY = y;
  const rsZ = degPCos * z - degPSin * x;

  const rsPoint: Vector = [rsX, rsY, rsZ];
  return rsPoint;
};


export const vectorRotateX = (point: Vector, deg: number) => {
  const degP = deg * Math.PI / 180;
  const degPSin = sin(degP);
  const degPCos = cos(degP);

  const x = point[vectorDimX];
  const y = point[vectorDimY];
  const z = point[vectorDimZ];

  const rsX = x;
  const rsY = degPCos * y - degPSin * z;
  const rsZ = degPCos * z + degPSin * y;

  const rsPoint: Vector = [rsX, rsY, rsZ];
  return rsPoint;
};


