

const { sin, cos, } = Math;


export const pointDimX = 0;
export const pointDimY = 1;
export const pointDimZ = 2;

export const pointMin = Number.MIN_SAFE_INTEGER;

/**
 * 立体位置
 */
export type PointD3 = [x: number, y: number, z: number];

/**
 * 法向量
 */
export type NormalVector = [x: number, y: number, z: number];


export const pointD3RotateZ = (point: PointD3, deg: number) => {
  const degP = deg * Math.PI / 180;
  const degPSin = sin(degP);
  const degPCos = cos(degP);

  const x = point[pointDimX];
  const y = point[pointDimY];
  const z = point[pointDimZ];

  const rsX = degPCos * x - degPSin * y;
  const rsY = degPSin * x + degPCos * y;
  const rsZ = z;

  const rsPoint: PointD3 = [rsX, rsY, rsZ];
  return rsPoint;
};

export const pointD3RotateY = (point: PointD3, deg: number) => {
  const degP = deg * Math.PI / 180;
  const degPSin = sin(degP);
  const degPCos = cos(degP);

  const x = point[pointDimX];
  const y = point[pointDimY];
  const z = point[pointDimZ];

  const rsX = degPCos * x + degPSin * z;
  const rsY = y;
  const rsZ = degPCos * z - degPSin * x;

  const rsPoint: PointD3 = [rsX, rsY, rsZ];
  return rsPoint;
};


export const pointD3RotateX = (point: PointD3, deg: number) => {
  const degP = deg * Math.PI / 180;
  const degPSin = sin(degP);
  const degPCos = cos(degP);

  const x = point[pointDimX];
  const y = point[pointDimY];
  const z = point[pointDimZ];

  const rsX = x;
  const rsY = degPCos * y - degPSin * z;
  const rsZ = degPCos * z + degPSin * y;

  const rsPoint: PointD3 = [rsX, rsY, rsZ];
  return rsPoint;
};
