import SlCard from '@shoelace-style/shoelace/dist/react/card';

import "./pokemonlist.css"

// This is a super early idea
// Talked about list view (html table) vs card view (Shoelace cards)

const mons = [
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
  { name: "Hawlucha", type: "Fighting/Flying", cost: 99 },
];

const renderMons = () => {
  return mons.map(mon =>
    <>
      <tr>
        <td>{mon.name}</td>
        <td>{mon.type}</td>
        <td>{mon.name}</td>
      </tr>
    </>);
}

const PokemonList = () => {
  return <SlCard>
    <table class="poketable">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Cost</th>
      </tr>
      {renderMons()}
    </table>
  </SlCard>;
}

export default PokemonList;
