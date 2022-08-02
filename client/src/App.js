import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  landingPage  from './components/landingPage/landingPage'
import  Home  from './components/home/home'
import Details from './components/details/details';
import PostPokemon from './components/pokemonCreate/createPokemon';
function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = { landingPage }/>
        <Route path = '/home' component = { Home }/>
        <Route path = '/pokemons/:id' component={Details}/>
        <Route path = '/pokemons' component={PostPokemon}/>
      </Switch>
    </div>
    </BrowserRouter>
    )
}

export default App;
