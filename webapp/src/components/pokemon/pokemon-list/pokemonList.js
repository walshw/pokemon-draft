import SlCard from '@shoelace-style/shoelace/dist/react/card';
import "./pokemonList.css"

const PokemonList = (props) => {
  const renderMons = () => {
    return props.mons.filter(mon => !mon.picked).map((mon, idx) =>
      <tr
        key={idx}
        onClick={() => props.setSelectedPokemon(mon)} 
        className={mon.name === props.selectedMon ? "selectedMon" : ""}
        >
        <td>{mon.name}</td>
        <td>{mon.type}</td>
        <td>{mon.cost}</td>
      </tr>);
  }

  return <SlCard>
    <table className="poketable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {renderMons(props.mons)}
      </tbody>
    </table>
  </SlCard>;
}

export default PokemonList;
