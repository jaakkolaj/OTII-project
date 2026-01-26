import app from './src/app'

const PORT = parseInt(process.env.PORT || '5000', 10)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
