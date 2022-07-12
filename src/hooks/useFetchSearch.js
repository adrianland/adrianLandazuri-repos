import React from 'react';
import axios from 'axios'

export default function useFetchSearch() {
  const [get, setGet] = React.useState([]);

  async function getData(nameOrId='bulbasaur') {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`)
      .then(resp => {
        console.log(resp)
        axios.get(resp.data.forms[0].url)
          .then(result => {
            setGet(prevArray => [...prevArray, result.data])
          })

      })
  }

  React.useEffect(() => {
    const result = getData()
    .catch(console.error);

    console.log(result)
  }, []);

  return get;
}