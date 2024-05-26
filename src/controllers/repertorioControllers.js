import path from 'path'
import fs from 'fs'
const getHtml = (req, res) => {
  res.sendFile(path.resolve('index.html'))
}

const getRepertorio = (req, res) => {
  try {
    const repertorio = JSON.parse(fs.readFileSync('./src/data/repertorio.json', 'utf8'))
    res.status(200).json(repertorio)
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha encontrado una situación que no sabe cómo manejarla.' })
  }
}

const postRepertorio = (req, res) => {
  try {
    const { id, titulo, artista, tono } = req.body
    const repertorio = JSON.parse(fs.readFileSync('./src/data/repertorio.json', 'utf8'))
    repertorio.push({
      id,
      titulo,
      artista,
      tono
    })
    fs.writeFileSync('./src/data/repertorio.json', JSON.stringify(repertorio))
    res.status(201).send({ message: 'La solicitud ha tenido éxito y se ha agregado la canción' })
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha encontrado una situación que no sabe cómo manejarla.' })
  }
}

const putRepertorio = (req, res) => {
  try {
    const { id } = req.params
    const { titulo, artista, tono } = req.body
    const repertorio = JSON.parse(fs.readFileSync('./src/data/repertorio.json', 'utf8'))
    const index = repertorio.findIndex(e => e.id.toString() === id)
    repertorio[index] = { id: parseInt(id), titulo, artista, tono }
    fs.writeFileSync('./src/data/repertorio.json', JSON.stringify(repertorio))
    res.status(201).send({ message: 'La solicitud ha tenido éxito y se ha editado la cancion.' })
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha encontrado una situación que no sabe cómo manejarla.' })
  }
}

const deleteRepertorio = (req, res) => {
  try {
    const { id } = req.query
    const repertorio = JSON.parse(fs.readFileSync('./src/data/repertorio.json', 'utf8'))
    const index = repertorio.findIndex(p => p.id === parseInt(id))
    repertorio.splice(index, 1)
    fs.writeFileSync('./src/data/repertorio.json', JSON.stringify(repertorio))
    res.status(200).send({ message: 'La solicitud ha tenido éxito y se eliminado la canción.' })
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha encontrado una situación que no sabe cómo manejarla.' })
  }
}

export { getHtml, getRepertorio, postRepertorio, putRepertorio, deleteRepertorio }
