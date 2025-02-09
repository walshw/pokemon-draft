import SlButton from '@shoelace-style/shoelace/dist/react/button';
import './pokemonConfirmation.css';

const PokemonConfirmation = (props) => {
    if (!props.isPlayerPicking) {
        return <div>Wait your turn</div>;
    }

    return <div>
        {!props || props.selectedMon === null || props.selectedMon.name === "" ? "Please select a 🐒" : <>
            <div>Lock in {props.selectedMon.name} </div>
            <SlButton onClick={props.cancelPokemon}>Cancel</SlButton>
            <SlButton onClick={props.confirmPokemon}>Confirm</SlButton>
        </>}
    </div>;
}

export default PokemonConfirmation;
