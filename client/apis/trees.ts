import request from "superagent";

import { Tree, TreeData } from "../../models/trees";

export async function getAllTrees(){
  const result = await request.get('/api/v1/trees/')
  console.log(result)
  return result.body as Tree[]
}

export async function getTreeById(id: number){
  const result = await request.get(`/api/v1/trees/${id}`)
  console.log(result)
  return result.body as Tree
}

export async function addTree(tree: TreeData){
  const result = await request.post(`/api/v1/trees/`).send(tree)
  console.log(result)
  return result.body as Tree
}

export async function editTreeById(id: number, tree: TreeData){
  const result = await request.patch(`/api/v1/trees/${id}`).send(tree)
  console.log(result)
  return result.statusCode
}

export async function deleteTreeById(id: number){
  const result = await request.delete(`/api/v1/trees/${id}`)
  console.log(result)
  return result.statusCode
}