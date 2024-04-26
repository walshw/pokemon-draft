import SlCard from '@shoelace-style/shoelace/dist/react/card';
import './lobby.css';

const Lobby = (props) => {
    const { connections } = props;

    return <SlCard>
        <div>Please Wait for the game to start</div>
        <div>Connections: {connections.length}</div>
        <div>
            <ul>
                {connections.map(connection => <li>{connection.address} | {connection.id}</li>)}
            </ul>
        </div>
    </SlCard>;
}

export default Lobby;