// - - IMPORTS - - //

import { Tree, TreeData } from '../../models/trees.ts'
import db from "./connection.ts";

// - - FUNCTIONS - - //

// getAllTrees

export async function getAllTrees(): Promise<Tree[]> {
  const result = await db('trees')
    .select(
      'id',
      'common_name as commonName',
      'scientific_name as scientificName', 
      'family', 
      'height', 
      'width', 
      'trunk_diameter as trunkDiameter', 
      'flower_color as flowerColor', 
      'native_region as nativeRegion',
      'description', 
      'notes'
    )
  return result
}

// getTreeById
export async function getTreeById(id: number): Promise<TreeData> {
  const tree = await db('trees')
    .where({ id })
    .first()
    .select(
      'common_name as commonName',
      'scientific_name as scientificName', 
      'family', 
      'height', 
      'width', 
      'trunk_diameter as trunkDiameter', 
      'flower_color as flowerColor', 
      'native_region as nativeRegion',
      'description', 
      'notes'
    )
  return tree
}

// editTree

export async function editTree(id: number, newTree: TreeData): Promise<number>{
  const result = await db('trees').where('id', id).update(
    {
      'common_name': newTree.commonName,
      'scientificName': newTree.scientificName,
      'family': newTree.family,
      'height': newTree.height,
      'width': newTree.width, 
      'trunk_diameter': newTree.trunkDiameter,
      'flower_color': newTree.flowerColor,
      'native_region': newTree.nativeRegion,
      'description': newTree.description,
      'notes': newTree.notes
    }
  )

  return result
}

// deleteTreeById
export async function deleteTreeById(id: number): Promise<number> {
  const tree = await db('trees')
    .where({ id })
    .first()
    .del()
  return tree
}

// addTree
export async function addTree(newTree: TreeData): Promise<number[]> {
  const t = {
    'common_name': newTree.commonName,
    'scientific_name': newTree.scientificName,
    'family': newTree.family,
    'height': newTree.height,
    'width': newTree.width, 
    'trunk_diameter': newTree.trunkDiameter,
    'flower_color': newTree.flowerColor,
    'native_region': newTree.nativeRegion,
    'description': newTree.description,
    'notes': newTree.notes
  }

  const result = await db('trees').insert(t)

  return result
}