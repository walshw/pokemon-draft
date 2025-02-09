import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import "./pokemonList.css"

const PokemonList = (props) => {
  const handleClick = (mon) => {
    if (props.isPlayerPicking) {
      props.setSelectedPokemon(mon);
    }
  }

  const stringToBadge = (type) => {
    switch (type) {
      case "Fighting":
        return <SlBadge className="sl-badge fighting">Fighting</SlBadge>
      case "Fire":
        return <SlBadge className="sl-badge fire">Fire</SlBadge>
      case "Ground":
        return <SlBadge className="sl-badge ground">Ground</SlBadge>
      case "Rock":
        return <SlBadge className="sl-badge rock">Rock</SlBadge>
      case "Electric":
        return <SlBadge className="sl-badge electric">Electric</SlBadge>
      case "Bug":
        return <SlBadge className="sl-badge bug">Bug</SlBadge>
      case "Grass":
        return <SlBadge className="sl-badge grass">Grass</SlBadge>
      case "Ice":
        return <SlBadge className="sl-badge ice">Ice</SlBadge>
      case "Water":
        return <SlBadge className="sl-badge water">Water</SlBadge>
      case "Flying":
        return <SlBadge className="sl-badge flying">Flying</SlBadge>
      case "Dragon":
        return <SlBadge className="sl-badge dragon">Dragon</SlBadge>
      case "Ghost":
        return <SlBadge className="sl-badge ghost">Ghost</SlBadge>
      case "Poison":
        return <SlBadge className="sl-badge poison">Poison</SlBadge>
      case "Fairy":
        return <SlBadge className="sl-badge fairy">Fairy</SlBadge>
      case "Psychic":
        return <SlBadge className="sl-badge psychic">Psychic</SlBadge>
      case "Normal":
        return <SlBadge className="sl-badge normal">Normal</SlBadge>
      case "Steel":
        return <SlBadge className="sl-badge steel">Steel</SlBadge>
      case "Dark":
        return <SlBadge className="sl-badge dark">Dark</SlBadge>


      default:
        break;
    }
  }

  const renderTypes = (types) => {


    return <div>{types.map(stringToBadge)}</div>
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
        <td>{renderTypes(mon.types)}</td>
        <td>{mon.abilities.join(", ")}</td>
        <td>{mon.hp}</td>
        <td>{mon.atk}</td>
        <td>{mon.def}</td>
        <td>{mon.spa}</td>
        <td>{mon.spd}</td>
        <td>{mon.spe}</td>
      </tr>);
  }

  return <div className="poketable">
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
  </div>;
}

export default PokemonList;
