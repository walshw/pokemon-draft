import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';

import "./teamCard.css";

const TeamCard = (props) => {
    const { team } = props;

    return <>
        <SlCard>
            <div className="teamContainer">
                <div className="playerInfo">
                    <SlAvatar image="https://i.redd.it/zu8rpygrxbf31.jpg"></SlAvatar>
                    <div>{team.name}</div>
                    <SlBadge variant={props.isPicking ? "success" : "neutral"}>{team.pickOrder}</SlBadge>
                </div>

                <div>
                    <SlIcon name="hexagon-fill"></SlIcon>
                    <SlIcon name="hexagon-fill"></SlIcon>
                    <SlIcon name="hexagon"></SlIcon>
                    <SlIcon name="hexagon"></SlIcon>
                    <SlIcon name="hexagon"></SlIcon>
                    <SlIcon name="hexagon"></SlIcon>
                </div>

                <div className="pointContainer">
                    <SlProgressBar value={45} />
                    45 of 110 points
                </div>
            </div>
        </SlCard>
    </>;
}

export default TeamCard;
