import { useState, useEffect } from "react";
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import pfps from '../../data/images.json';

import "./loginScreen.css";

function LoginScreen(props) {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [pfpFilter, setPfpFilter] = useState("");
    const [pfpState, setPfpState] = useState(pfps);

    useEffect(() => {
        if (pfpFilter.trim() === "") {
            setPfpState(pfps);
            return;
        }

        setPfpState(pfps.filter(img => img.imageName.includes(pfpFilter)));

    }, [pfpFilter]);

    const handleClick = (img) => {
        if (props.pfp && img.fileName === props.pfp.fileName) {
            props.setUserPfp(null);
            return;
        }
        props.setUserPfp(img);
    }

    const getClassName = (img) => {
        if (props.pfp && img.fileName === props.pfp.fileName) {
            return "pfp selectedPfp";
        }

        return "pfp";
    }

    const renderImages = () => {
        return <div className="pfpContainer">
            {pfpState.map((img) =>
                <SlCard className={getClassName(img)} onClick={() => handleClick(img)}>
                    <img src={img.fileName} alt={img.fileName} />
                </SlCard>)}
        </div>;
    }

    const renderSelectedPfp = () => {
        if (!props.pfp) {
            return;
        }

        return <SlCard>
            <img src={props.pfp.fileName} alt={props.pfp.fileName} />
            <div>Name: {props.pfp.imageName}</div>
            <div>Artist: {props.pfp.artistName}</div>
        </SlCard>
    }

    const renderLoginForm = () => {
        return <div className="loginScreenContainer">
            <SlInput label="What's your name?" onSlInput={(e) => props.setUserId(e.target.value)}></SlInput>
            <SlInput label="Search pfps" onSlInput={(e) => setPfpFilter(e.target.value)}></SlInput>
            {renderImages()}
            {renderSelectedPfp()}
            <SlButton onClick={() => setIsloggedIn(true)} disabled={!props.pfp}>PLAY</SlButton>
        </div>
    }

    return <>
        {isLoggedIn ? props.children : renderLoginForm()}
    </>;
}

export default LoginScreen;