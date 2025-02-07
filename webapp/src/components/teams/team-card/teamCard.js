import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';

import "./teamCard.css";

const TeamCard = (props) => {
    const { team, isCurrentUser } = props;
    const teamMax = 12;
    const userClass = isCurrentUser === true ? " userTeam" : "";

    const renderPokemonSlots = () => {
        return <div>
            {team.mons.map(mon => <SlAvatar image={mon.fileName} key={mon.id}/>)}
        </div>;
    }

    return <>
        <SlCard>
            <div className={"teamContainer" + userClass}>
                <div className="playerInfo">
                    <SlAvatar image={team.pfp.fileName ?? "https://i.redd.it/zu8rpygrxbf31.jpg"}></SlAvatar>
                    <div>{team.name}</div>
                    <SlBadge variant={props.isPicking ? "success" : "neutral"}>{team.pickOrder}</SlBadge>
                </div>

                {renderPokemonSlots()}
                
                <div className="pointContainer">
                    {team.mons.length} of {teamMax}
                </div>
            </div>
        </SlCard>
    </>;
}

export default TeamCard;
