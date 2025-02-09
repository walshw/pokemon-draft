import TeamCard from "../teams/team-card/teamcard";
import TeamList from "../teams/team-list/teamList";
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const EndScreen = (props) => {
    const myTeam = props.teams.filter(team => team.id == props.userId)[0];

    const copyTeam = (me) => {
        let ret = "";

        const monMapper = (mon => mon.name);

        if (me) {
            ret = myTeam.mons.map(monMapper);
        } else {
            ret = props.teams.map(team => {
                return {name: team.name, mons: team.mons.map(monMapper),}
            })
        }

        navigator.clipboard.writeText(JSON.stringify(ret,null, "\t"));
    }

    const renderRow = (team, isMe) => {
        if (team.name === props.userId && !isMe) {
            return;
        }

        const teamClass = "endTeam" + (isMe ? " me" : "")

        return <div className={teamClass} key={team.id}>
            <div className="playerInfo">
                <div className="playerIconAndName">
                    <SlAvatar image={team.pfp.fileName ?? "https://i.redd.it/zu8rpygrxbf31.jpg"}></SlAvatar>
                    <div>{team.name}</div>
                </div>
            </div>
            <div className="teamMons">
                {team.mons.map(mon => <img src={mon.fileName} key={mon.id} ></img>)}
            </div>
        </div>;
    }

    return <div>
        <div className="playerEndTeam">
            <div className="heading">
                <h1>Holy shit that worked?</h1>
            </div>
            {renderRow(myTeam, true)}
            <div className="buttonGroup">
                <SlButton variant="primary" onClick={() => copyTeam(true)}>Copy Your Team <SlIcon name="copy" ></SlIcon></SlButton>
                <SlButton variant="default" onClick={() => copyTeam()}>Copy All Teams <SlIcon name="copy" ></SlIcon></SlButton>

            </div>
        </div>

        <div className="endTeamContainer">
            {props.teams.map(team => {
                // return <TeamCard team={team} />

                return renderRow(team, false);
            })}
        </div>
    </div>

}

export default EndScreen;