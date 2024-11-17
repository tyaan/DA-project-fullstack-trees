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
        <h1>Trees. It's just some trees. Add Trees. Delete Trees. Enjoy. </h1>
      </header>
      <section>
        <h2>Add New Tree</h2>
          <form onSubmit={handleAdd}>
            Common Name: <br />
            <input name="commonName" value={formState.commonName} onChange={handleChange} />
            <br />
            Scientific Name: <br />
            <input name="scientificName" value={formState.scientificName} onChange={handleChange} />
            <br />
            Family: <br />
            <input name="family" value={formState.family} onChange={handleChange} />
            <br />
            Height: <br />
            <input name="height" value={formState.height} onChange={handleChange} />
            <br />
            Width: <br />
            <input name="width" value={formState.width} onChange={handleChange} />
            <br />
            Trunk Diameter: <br />
            <input name="trunkDiameter" value={formState.trunkDiameter} onChange={handleChange} />
            <br />
            FlowerColor: <br />
            <input name="flowerColor" value={formState.flowerColor} onChange={handleChange} />
            <br />
            Native Region: <br />
            <input name="nativeRegion" value={formState.nativeRegion} onChange={handleChange} />
            <br />
            Description: <br />
            <input name="description" value={formState.description} onChange={handleChange} />
            <br />
            Notes: <br />
            <input name="notes" value={formState.notes} onChange={handleChange} />
            <br />
            <br />
            <button type="submit">Add</button>
          </form>
      </section>
      <section className="main">
        <table>
          <tr>
            <th>SELECT</th>
            <th>ID</th>
            <th>COMMON NAME</th>
            <th>SCIENTIFIC NAME</th>
            <th>FAMILY</th>
            <th>HEIGHT</th>
            <th>WIDTH</th>
            <th>TRUNK DIAMETER</th>
            <th>FLOWER COLOR</th>
            <th>NATIVE REGION</th>
            <th>DESCREIPTION</th>
            <th>NOTES</th>
          </tr>
          {data.map((tree) => {
            return (
              <tr key={tree.id + tree.commonName} >
                <td><button onClick={() => handleDelete(tree.id)}>Delete</button></td>
                <td>{tree.id}</td>
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
              </tr>
            )
          })}
        </table>
      </section>
    </>
  )
}

export default App