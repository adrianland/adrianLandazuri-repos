import './cardPokemon.css';
export default function CardPokemon({getData,selectPokemon}) {

  function whoIsThatPokemon(get){
    selectPokemon(get)
  }

  return (
    <div className="container">
      {

        getData.map((get, index) => (
          <button onClick={() => whoIsThatPokemon(get)} key={index}>
         
          <div className="card" >
            <div className="card__header">
              <img src={get.sprites.front_default } alt="card__image" className="card__image" width="600" />
            </div>
            <div className="card__body">
              <span className="tag tag-blue"># {get.id}</span>
              <h4> {get.name}</h4>
              <br/>
            </div>
          </div>
          </button>
        ))

      }

    </div>
  );
}