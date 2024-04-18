import SlCard from '@shoelace-style/shoelace/dist/react/card';
import TeamCard from '../team-card/teamcard';

import "./teamlist.css";

const teams = [
    { name: "William" },
    { name: "Billy" },
    { name: "Guillermo" },
];


const renderTeamCards = () => {
    return <div className="teamsContainer">
        {teams.map(team => {
            return <TeamCard name={team.name} />
        })}
    </div>

    return;
}

const TeamList = () => {
    return <SlCard>
        {renderTeamCards()}
    </SlCard>;
}

export default TeamList;
