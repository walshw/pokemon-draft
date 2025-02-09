import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';

import "./teamCard.css";

const TeamCard = (props) => {
    const { team, isCurrentUser, isPicking } = props;
    const userClass = isCurrentUser === true ? " userTeam" : "";
    const pickingClass = isPicking ? " pickingTeam" : "";

    const renderPokemonSlots = () => {
        return <div className="teamMons">
            {team.mons.map(mon => <img src={mon.fileName} key={mon.id} ></img>)}
        </div>;
    }
    
    return <div className={"team" + userClass + pickingClass} key={team.id}>
        <div className="playerInfo">
            <div className="playerIconAndName">
                <SlAvatar image={team.pfp.fileName ?? "https://i.redd.it/zu8rpygrxbf31.jpg"}></SlAvatar>
                <div>{team.name}</div>
            </div>
        </div>

        {renderPokemonSlots()}
    </div>;
}

export default TeamCard;
