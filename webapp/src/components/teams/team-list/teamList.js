import SlCard from '@shoelace-style/shoelace/dist/react/card';
import TeamCard from '../team-card/teamCard';

import "./teamList.css";

const TeamList = (props) => {
    const renderTeamCards = (teams) => {
        teams.sort((team, prev) => team.pickOrder - prev.pickOrder);

        return <div className="teamsContainer">
            {teams.map(team => {
                return <div key={team.id}>
                    <TeamCard team={team} isCurrentUser={props.userId === team.id} isPicking={team.id === props.pickingTeamId} />
                </div>
            })}
        </div>;
    }

    return <SlCard>
        {renderTeamCards(props.teams)}
    </SlCard>;
}

export default TeamList;
