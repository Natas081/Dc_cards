import Card from './components/Card/Card'
import Batman from './assets/cards/Batman.jpeg'
import Joker from './assets/cards/Joker.jpeg'

import './App.css'

function App() {
  return (
    <main className="app">
      <Card
        frontImage={Batman}
        hiddenImage={Joker}
        alt="Batman Ano Um"
      />
    </main>
  )
}

export default App