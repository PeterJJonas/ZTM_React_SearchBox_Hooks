import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll.js';
import StayPut from '../components/StayPut';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App() {

  const [monsters, setMonsters] = useState([])
  const [searchfield, setSearchfield] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {setMonsters(users)});
    // console.log(count)
  },[count])

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredMonsters = monsters.filter(monster => {
    return monster.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  return !monsters.length ?
    <h1 className='tc f1'>Loading</h1> :
    (
      <div className='tc'>
        <StayPut>
          <h1 className='f1'>Monsterfriends</h1>
          <button onClick={()=>setCount(count+1)}>Re-fetch Monsters</button>
          <SearchBox searchChange={onSearchChange}/>
        </StayPut>
        <ErrorBoundry>
          <CardList monsters={filteredMonsters}/>
        </ErrorBoundry>
      </div>
    );
}

export default App;
