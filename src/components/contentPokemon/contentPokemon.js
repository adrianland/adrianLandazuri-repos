import React from 'react';

import CardPokemon from '../cardPokemon/cardPokemon'
import DetailPokemon from '../detailPokemon/detailPokemon'
import Pagination from '../pagination/Pagination';
import Spinner from '../spinner/Spinner'
import './contentPokemon.css'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'


export default function ContentPokemon() {
  const [get, setGet] = React.useState([]);
  const [getsData, setGetsData] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(20);

  function selectPokemon(nameOrId) {
    setGet(nameOrId)
  }

  function handleChange(event) {
    if(event.target.value == '') getData()
  }

  const getData = async () => {
    setGetsData([])
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .then(resp => {
        console.log(resp)
        setLoading(false)
        for (let i = 0; i < resp.data.results.length; i++) {

          axios.get(resp.data.results[i].url)
            .then(result => {
              setGetsData(prevArray => [...prevArray, result.data])
            })
        }
      }
      ).catch(e => {
        console.error(e);
      })
  }

  function filterSearch(nameOrId) {
    nameOrId.preventDefault();
    const value = nameOrId.target[0].value
    if (value == '') getData()
    setGetsData([])
    console.log(value)
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
      .then(resp => {
        console.log(resp)

        axios.get(resp.data.forms[0].url)
          .then(result => {
            setGetsData(prevArray => [...prevArray, result.data])
          })
        setLoading(false)
      })
  }

  React.useEffect(() => {

    const fetchData = async () => {
      const data = await getData();
      console.log(data)
    }
    fetchData();


  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = getsData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className='title'>Listado de Pokemón</h1>
      <div className='content'>
        <div >
          <form className='search' onSubmit={filterSearch}>
            <input type="text" placeholder="id or name" name="searchTerm" onChange={handleChange} />
            <button className='searchButton'><FaSearch /></button>
          </form>
          {
            loading === false ?
              <CardPokemon getData={currentPosts} selectPokemon={selectPokemon} />
              :
             <Spinner/>
          }

        </div>
        <DetailPokemon getData={get} className='cardPokemon' />
      </div>

      <div className='paginationButton'>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={getsData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

