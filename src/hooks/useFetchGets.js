import React from 'react';
import axios from 'axios'

export default function useFetchGets() {
  const [get, setGet] = React.useState([]);

  async function getData() {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .then(resp => {
        console.log(resp)
        for (let i = 0; i < resp.data.results.length; i++) {
         
          axios.get(resp.data.results[i].url)
            .then(result => {
              setGet(prevArray => [...prevArray, result.data])
            })
        }
      }
      ).catch(e => {
        console.error(e);
      })
  }

  React.useEffect(() => {
    const result = getData()
    .catch(console.error);

    console.log(result)
  }, []);

  return get;
}