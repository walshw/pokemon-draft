import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import './pokemonConfirmation.css';

const PokemonConfirmation = (props) => {
    return <SlCard>
        {!props || props.selectedMon === null || props.selectedMon.name === "" ? "Please select a 🐒" : <>
            <div>Lock in {props.selectedMon.name} </div>
            <SlButton onClick={props.cancelPokemon}>Cancel</SlButton>
            <SlButton onClick={props.confirmPokemon}>Confirm</SlButton>
        </>}
    </SlCard>;
}

export default PokemonConfirmation;
