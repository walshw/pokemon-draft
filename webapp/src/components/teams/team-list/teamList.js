import TeamCard from '../team-card/teamCard';
import "./teamlist.css";

const TeamList = (props) => {
    const renderTeamCards = (teams) => {
        teams.sort((team, prev) => team.pickOrder - prev.pickOrder);

        const pickingTeamText = props.pickingTeamId && props.pickingTeamId === props.userId ? "You are " : props.pickingTeamId + " is ";
        return <div className="teamsContainer">
            <div className="picking">{pickingTeamText + "picking..."}</div>
            {teams.map(team => {
                return <TeamCard team={team} isCurrentUser={props.userId === team.id} isPicking={team.id === props.pickingTeamId} />
            })}
        </div>;
    }

    return renderTeamCards(props.teams);
}

export default TeamList;
