import React, { useState } from 'react'
import Movie from '../components/Movie'

const Home = () => {

    const searcher = (e)=>{
        setSearch(e.target.value)
        console.log(e.target.value);

    }

    const [search, setSearch] = useState("")

  return (
    <>
  
        <section>
        
        <Movie></Movie>
        
        </section>

    </>

  )
}

export default Home