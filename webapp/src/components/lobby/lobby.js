import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import './lobby.css';

const Lobby = (props) => {
    const { connections, isAdmin } = props;
    console.log("rerendered");

    const handleType = (id, e) => {
        if (e.target.value.match(/^\d+$/)) {
            props.setUserPickOrder(id, Number(e.target.value));
            e.target.value = Number(e.target.value);
            return;
        }
        
        e.target.value = 0;
    }

    const renderRow = (address, id, pickOrder) => {
        if (isAdmin) {
            return <div>
                {address} | {id}
                <SlInput
                    type="number"
                    value={pickOrder}
                    onSlInput={(e) => handleType(id, e)}
                    required>
                </SlInput>
            </div>;
        }

        return <div>{id}</div>
    }

    return <SlCard>
        <div>Please Wait for the game to start</div>
        <div>Connections: {connections.length}</div>
        <div>
            <ul>
                {connections.sort((a, b) => a.pickOrder - b.pickOrder).map(connection => <li>{renderRow(connection.address, connection.id, connection.pickOrder)}</li>)}
            </ul>
        </div>
    </SlCard>;
}

export default Lobby;