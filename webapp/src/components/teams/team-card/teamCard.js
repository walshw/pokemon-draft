import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';

import "./teamCard.css";

const TeamCard = (props) => {
    const { team } = props;

    const teamMax = 13;

    const renderPokemonSlots = () => {
        const diff = teamMax - team.mons.length;

        const tempSlots = [...team.mons, ...Array.from(diff)];

        // if (tempSlots.length < teamMax - 1) {
        //     tempSlots 

        //     tempSlots.fill(null, tempSlots.length - 1, teamMax - 1);
        // }

        return <div>
            {tempSlots.map(slot => slot === null ? <SlIcon name="hexagon"/> : <SlIcon name="hexagon-fill" key={slot.id}/>)}
        </div>;
    }

    return <>
        <SlCard>
            <div className="teamContainer">
                <div className="playerInfo">
                    <SlAvatar image="https://i.redd.it/zu8rpygrxbf31.jpg"></SlAvatar>
                    <div>{team.name}</div>
                    <SlBadge variant={props.isPicking ? "success" : "neutral"}>{team.pickOrder}</SlBadge>
                </div>

                {renderPokemonSlots()}

                <div className="pointContainer">
                    <SlProgressBar value={45} />
                    45 of 110 points
                </div>
            </div>
        </SlCard>
    </>;
}

export default TeamCard;
