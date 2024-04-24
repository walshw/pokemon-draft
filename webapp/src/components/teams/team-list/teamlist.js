import SlCard from '@shoelace-style/shoelace/dist/react/card';
import TeamCard from '../team-card/teamCard';

import "./teamlist.css";

// const teams = [
//     { name: "William", pickOrder: 1 },
//     { name: "Billy", pickOrder: 3 },
//     { name: "Guillermo", pickOrder: 2 },
//     { name: "Wilhelm", pickOrder: 4 },
//     { name: "Guglielmo", pickOrder: 5 },
// ];

const TeamList = (props) => {
    const renderTeamCards = (teams) => {
        teams.sort((team, prev) => team.pickOrder - prev.pickOrder);

        return <div className="teamsContainer">
            {teams.map(team => {
                return <div key={team.id}>
                    <TeamCard team={team} isPicking={team.id === props.pickingTeamId} />
                </div>
            })}
        </div>;
    }

    return <SlCard>
        {renderTeamCards(props.teams)}
    </SlCard>;
}

export default TeamList;
