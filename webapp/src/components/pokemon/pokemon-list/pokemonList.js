import SlCard from '@shoelace-style/shoelace/dist/react/card';
import "./pokemonList.css"

const PokemonList = (props) => {
  const handleClick = (mon) => {
    if (props.isPlayerPicking) {
      props.setSelectedPokemon(mon);
    }
  }

  const renderMons = () => {
    return props.mons.filter(mon => !mon.picked).map((mon, idx) =>
      <tr
        key={idx}
        onClick={() => handleClick(mon)}
        className={props.selectedMon && mon.name === props.selectedMon.name ? "selectedMon" : ""}
      >
        <td><img src={mon.fileName} alrt={mon.fileName} /></td>
        <td>{mon.name}</td>
        <td>{mon.types.join(", ")}</td>
        <td>{mon.abilities.join(", ")}</td>
        <td>{mon.hp}</td>
        <td>{mon.atk}</td>
        <td>{mon.def}</td>
        <td>{mon.spa}</td>
        <td>{mon.spd}</td>
        <td>{mon.spe}</td>
      </tr>);
  }

  return <SlCard className="poketable">
    <table>
      <thead>
        <tr>
          <td>Pokemon</td>
          <td></td>          
          <td>Type</td>
          <td>Abilities</td>
          <td>Hp</td>
          <td>Atk</td>
          <td>Def</td>
          <td>Spa</td>
          <td>Spd</td>
          <td>Spe</td>
        </tr>
      </thead>
      <tbody>
        {renderMons(props.mons)}
      </tbody>
    </table>
  </SlCard>;
}

export default PokemonList;
