
import './App.css'
import AnimalModal from './components/AnimalModal'


function App() {


  return (
    <>
      <h1>Fur-Ever Friends Rescue</h1>
      <AnimalModal show={true} onHide={console.log}/>
    </>
  )
}

export default App
