const express = require('express')
const cors = require('cors')

const app = express()


app.use(cors())
app.use(express.json())


let notes = [
	{
		id: 1,
		content: "HTML is easy",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true
	}
]

app.get('/', (req, res) =>{
	res.send(`<h1>Hello world</h1>`)
})

app.get('/api/notes', (req, res) => {
	res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const note = notes.find(n => n.id === id)
	if (note) {
		res.json(note)
	} else {
		return res.status(400).end()
	}
})

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	notes = notes.filter(n => n.id !== id)

	res.status(204).end()
})



const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})