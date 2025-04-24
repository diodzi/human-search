import About from './about'
import './App.css'

function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const search = searchParams.get('search')

  if (search) {
    if (search.includes('?')) {
      window.location.replace(
        `https://www.google.com/search?q=${search.replace('?', '')}+reddit`,
      )
      return null
    } else {
      window.location.replace(`https://www.google.com/search?q=${search}`)
    }
    return null
  }

  return <About />
}

export default App
