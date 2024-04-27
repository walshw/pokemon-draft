import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';

import "./teamCard.css";

const TeamCard = (props) => {
    const { team, isCurrentUser } = props;
    const teamMax = 13;
    const pointMax = 110;
    const userClass = isCurrentUser === true ? " userTeam" : "";

    const renderPokemonSlots = () => {
        const diff = teamMax - team.mons.length;
        const tempSlots = [...team.mons, ...Array.from({length:diff})];
        return <div>
            {tempSlots.map(slot => slot === undefined ? <SlIcon name="hexagon"/> : <SlIcon name="hexagon-fill" key={slot.id}/>)}
        </div>;
    }

    return <>
        <SlCard>
            <div className={"teamContainer" + userClass}>
                <div className="playerInfo">
                    <SlAvatar image="https://i.redd.it/zu8rpygrxbf31.jpg"></SlAvatar>
                    <div>{team.name}</div>
                    <SlBadge variant={props.isPicking ? "success" : "neutral"}>{team.pickOrder}</SlBadge>
                </div>

                {renderPokemonSlots()}

                <div className="pointContainer">
                    <SlProgressBar value={45} />
                    {team.points} of {pointMax}
                </div>
            </div>
        </SlCard>
    </>;
}

export default TeamCard;
