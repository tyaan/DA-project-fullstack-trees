// - - IMPORTS - - //

import express from 'express'
import * as db from '../db/db.ts'
import { Tree, TreeData } from '../../models/trees.ts'

// - - ROUTER CONFIG - - //

const router = express.Router()
export default router

// - - ROUTES - - //

// GET
router.get('/', async (req, res) => {
  
  try {
    const trees = await db.getAllTrees()
    res.json(trees)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// router.get('/conservation')

// GET
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tree = await db.getTreeById(Number(id))
    res.json(tree)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// POST
router.post('/', async (req, res) => {
  try {
    const newTree = req.body as TreeData
    const id = await db.addTree(newTree)
    res.json({ ...newTree, id: id[0] })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// PATCH
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedTree = req.body as Tree
    await db.editTree(Number(id), updatedTree) // +id
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.deleteTreeById(Number(id)) // +id
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})