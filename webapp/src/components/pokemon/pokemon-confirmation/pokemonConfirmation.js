import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import './pokemonConfirmation.css';

const PokemonConfirmation = (props) => {
    return <SlCard>
        {props.selectedMon === "" ? "Please select a 🐒" : <>
            <div>Lock in {props.selectedMon} </div>
            <SlButton onClick={props.cancelPokemon}>Cancel</SlButton>
            <SlButton onClick={props.confirmPokemon}>Confirm</SlButton>
        </>}
    </SlCard>;
}

export default PokemonConfirmation;
