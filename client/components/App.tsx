import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllTrees, addTree, deleteTreeById } from "../apis/trees"
import { TreeData } from "../../models/trees"
import { ChangeEvent, useState, FormEvent } from "react"

function App() {

  const [formState, setFormState] = useState({
    commonName: '',
    scientificName: '',
    family: '',
    height: '',
    width: '',
    trunkDiameter: '',
    flowerColor: '',
    nativeRegion: '',
    description: '',
    notes: ''
  })

  const {data, isPending, isError} = useQuery({
    queryKey: ['trees'], 
    queryFn: () => getAllTrees()
  })

  const queryClient = useQueryClient()

  const deleteTreeMutation = useMutation({
    mutationFn: (treeId: number) => deleteTreeById(treeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trees'] });
    }
  })

  const handleDelete = (treeId: number) => {
    deleteTreeMutation.mutate(treeId)
  }

  const addTreeMutation = useMutation({
    mutationFn: (tree: TreeData) => addTree(tree),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['trees']})
    }
  })

  const handleAdd = (evt: FormEvent) => {
    evt.preventDefault()
    console.log('adding', formState.commonName)
    addTreeMutation.mutate({
      commonName: formState.commonName,
      scientificName: formState.scientificName,
      family: formState.family,
      height: Number(formState.height),
      width: Number(formState.width), 
      trunkDiameter: Number(formState.trunkDiameter),
      flowerColor: formState.flowerColor,
      nativeRegion: formState.nativeRegion, 
      description: formState.description, 
      notes: formState.notes
    })
  }

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>No Trees...</p>
  }

  return (
    <>
      <header className="header">
        <h1>Trees. It&apos;s just some trees. Add Trees. Delete Trees. Enjoy. </h1>
      </header>
      <section>
        <h2>Add New Tree</h2>
          <form onSubmit={handleAdd}>
            <label htmlFor="commonName">Common Name: </label> <br/>
            <input id="commonName" name="commonName" value={formState.commonName} onChange={handleChange} />
            <br />
            <label htmlFor="scientificName">Scientific Name: </label> <br/>
            <input id="scientificName" name="scientificName" value={formState.scientificName} onChange={handleChange} />
            <br />
            <label htmlFor="family">Family: </label> <br/>
            <input id="family" name="family" value={formState.family} onChange={handleChange} />
            <br />
            <label htmlFor="height">Height: </label> <br/>
            <input id="height" name="height" value={formState.height} onChange={handleChange} />
            <br />
            <label htmlFor="width">Width: </label> <br/>
            <input id="width" name="width" value={formState.width} onChange={handleChange} />
            <br />
            <label htmlFor="trunkDiameter">Trunk Diameter: </label> <br/>
            <input id="trunkDiameter" name="trunkDiameter" value={formState.trunkDiameter} onChange={handleChange} />
            <br />
            <label htmlFor="flowerColor">FlowerColor: </label> <br/>
            <input id="flowerColor" name="flowerColor" value={formState.flowerColor} onChange={handleChange} />
            <br />
            <label htmlFor="nativeRegion">Native Region: </label> <br/>
            <input id="nativeRegion" name="nativeRegion" value={formState.nativeRegion} onChange={handleChange} />
            <br />
            <label htmlFor="description">Description: </label> <br/>
            <input id="description" name="description" value={formState.description} onChange={handleChange} />
            <br />
            <label htmlFor="notes">Notes: </label> <br/>
            <input id="notes" name="notes" value={formState.notes} onChange={handleChange} />
            <br />
            <br />
            <button type="submit">Add</button>
          </form>
      </section>
      <section className="main">
        <table>
          <tr>
            <th>COMMON NAME</th>
            <th>SCIENTIFIC NAME</th>
            <th>FAMILY</th>
            <th>HEIGHT</th>
            <th>WIDTH</th>
            <th>TRUNK DIAMETER</th>
            <th>FLOWER COLOR</th>
            <th>NATIVE REGION</th>
            <th>DESCRIPTION</th>
            <th>NOTES</th>
            <th>DELETE</th>
          </tr>
          {data.map((tree) => {
            return (
              <tr key={tree.id + tree.commonName} >
                <td>{tree.commonName}</td>
                <td>{tree.scientificName}</td>
                <td>{tree.family}</td>
                <td>{tree.height}</td>
                <td>{tree.width}</td>
                <td>{tree.trunkDiameter}</td>
                <td>{tree.flowerColor}</td>
                <td>{tree.nativeRegion}</td>
                <td>{tree.description}</td>
                <td>{tree.notes}</td>
                <td><button onClick={() => handleDelete(tree.id)}>Delete</button></td>
              </tr>
            )
          })}
        </table>
      </section>
    </>
  )
}

export default App