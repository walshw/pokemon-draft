import SlCard from '@shoelace-style/shoelace/dist/react/card';

import "./pokemonList.css"

const renderMons = (mons) => {
  return mons.map((mon, idx) =>
    <tr key={idx}>
      <td>{mon.name}</td>
      <td>{mon.type}</td>
      <td>{mon.name}</td>
    </tr>);
}

const PokemonList = (props) => {
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
