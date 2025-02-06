import SlCard from '@shoelace-style/shoelace/dist/react/card';
import "./pokemonList.css"

const PokemonList = (props) => {
  const renderMons = () => {
    return props.mons.filter(mon => !mon.picked).map((mon, idx) =>
      <tr
        key={idx}
        onClick={() => props.setSelectedPokemon(mon)}
        className={props.selectedMon && mon.name === props.selectedMon.name ? "selectedMon" : ""}
      > 
        <td>{mon.name}</td>
        <td>{mon.hp}</td>
        <td>{mon.atk}</td>
        <td>{mon.def}</td>
        <td>{mon.spa}</td>
        <td>{mon.spd}</td>
        <td>{mon.spe}</td>
        <td>{mon.weight}</td>
        <td>{mon.height}</td>
        <td>{mon.types.join(", ")}</td>
        <td>{mon.abilities.join(", ")}</td>
        <td><img src={mon.fileName} alrt={mon.fileName}/></td>
        <td>{mon.picked}</td>
      </tr>);
  }

  return <SlCard className="poketable">
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Hp</td>
          <td>Atk</td>
          <td>Def</td>
          <td>Spa</td>
          <td>Spd</td>
          <td>Spe</td>
          <td>Weight</td>
          <td>Height</td>
          <td>Types</td>
          <td>Abilities</td>
          <td>FileName</td>
          <td>Picked</td>
        </tr>
      </thead>
      <tbody>
        {renderMons(props.mons)}
      </tbody>
    </table>
  </SlCard>;
}

export default PokemonList;
