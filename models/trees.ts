// - - INTERFACES - - //

export interface TreeData {
  commonName: string,
  scientificName?: string,
  family?: string,
  height?: number,
  width?: number,
  trunkDiameter?: number,
  flowerColor?: string,
  nativeRegion?: string,
  description?: string,
  notes?: string,
}

export interface Tree extends TreeData {
  id: number
}