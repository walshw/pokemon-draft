import SlButton from '@shoelace-style/shoelace/dist/react/button';
import './pokemonConfirmation.css';

const PokemonConfirmation = (props) => {
    if (!props.isPlayerPicking) {
        return <div className="confirmFooter">Wait for your turn...</div>;
    }

    return <div className="confirmFooter">
        {!props || props.selectedMon === null || props.selectedMon.name === "" ? "Please select a 🐒" : <>
            <div className="confirmPokemon">
                <img src={props.selectedMon.fileName} alt={props.selectedMon.fileName} />
                <div>Lock in {props.selectedMon.name}</div>
            </div>
            <div></div>
            <div className="buttonGroup">
                <SlButton variant="primary" onClick={props.confirmPokemon}>Confirm</SlButton>
                <SlButton onClick={props.cancelPokemon}>Cancel</SlButton>
            </div>
        </>}
    </div>;
}

export default PokemonConfirmation;
