import './detailPokemon.css';
export default function CardPokemon({ getData }) {
  console.log(getData)
  return (
    <div className="container">
      {
        getData.length == 0 ?
          <div className="card" >
            <div className="card__header">
              <img src='https://carroceriasandina.com/wp-content/uploads/2019/01/default-image.png' alt="card__image" className="card__image" width="200" />
            </div>
            <div className="card__body">
              <h5>no pokemon selected</h5>
              <br />
            </div>
          </div>
          :
          <div className="card" >
            <div className="card__header">
              <img src={getData.sprites.front_default} alt="card__image" className="card__image" width="200" />
            </div>
            <div className="card__body">
              <span className="tag tag-blue"># {getData.id}</span>
              <h5> {getData.name}</h5>
              <br />
            </div>
            <div className="user__info">
              <h5>Types</h5>
              <small>{getData.types[0].type.name}</small>

              {getData.weight != null ?
             
             <div>
               <h5>Peso</h5>
              <small>{getData.weight} kg</small>
             </div>
             :
             <div></div>}

              <h5>Sprites</h5>
              <div className='sprites'>
                <img src={getData.sprites.front_default} alt="user__image" className="user__image" />
                <img src={getData.sprites.back_default} alt="user__image" className="user__image" />
                <img src={getData.sprites.front_shiny} alt="user__image" className="user__image" />
                <img src={getData.sprites.front_default} alt="user__image" className="user__image" />
              </div>

              {getData.moves != null ?
             
             <div>
              <h5>Movimientos</h5>
              <small>{getData.moves[0].move.name} </small>
              <small>{getData.moves[1].move.name} </small>
              <small>{getData.moves[2].move.name} </small>
             </div>
             :
             <div></div>}
              
            </div>
          </div>
      }
    </div>
  );
}