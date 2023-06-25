const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


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

const date = new Date().toString()

const getRandomId = () => {
	let min = Math.ceil(5)
	let max = Math.floor(15000)

	return Math.floor(Math.random() * (max - min + 1)) + min
}

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for 2 people <br /> <br/>${date}</p>`)
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(p => p.id === id)

	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/notes/:id', (req, resp) => {
	const id =Number( req.params.id)
	notes = notes.filter(p => p.id !== id)

	resp.status(204).end()
})

app.post('/api/notes', (req, resp) => {
	const note = req.body;


	if (!note.name){
		return resp.status(400).json({ error: 'name missing'})
	} else if (!note.number) {
		return resp.status(400).json({ error: 'number missing'})
	} else {
		const name = note.name
		const test = notes.find(p => p.name === name)
		if (test) {
			return resp.status(400).json({ error: 'name must be unique'})
		} else {
			note.id = getRandomId()
			notes = notes.concat(note)
			resp.json(note)
		}
	}
})

const PORT = 3002
app.listen(PORT, () => {
	console.log(`Server Running on port: ${PORT}`)
})