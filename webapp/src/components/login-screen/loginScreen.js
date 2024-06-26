import { useState, useEffect } from "react";
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import pfps from '../../data/images.json';

import "./loginScreen.css";

function LoginScreen(props) {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [chosenPfp, setChosenPfp] = useState(null);
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
        if (chosenPfp && img.fileName === chosenPfp.fileName) {
            setChosenPfp(null);
            return;
        }

        setChosenPfp(img);
    }

    const getClassName = (img) => {
        if (chosenPfp && img.fileName === chosenPfp.fileName) {
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
        if (!chosenPfp) {
            return;
        }

        return <SlCard>
            <img src={chosenPfp.fileName} alt={chosenPfp.fileName} />
            <div>Name: {chosenPfp.imageName}</div>
            <div>Artist: {chosenPfp.artistName}</div>
        </SlCard>
    }

    const renderLoginForm = () => {
        return <div className="loginScreenContainer">
            <SlInput label="What's your name?" onSlInput={(e) => props.setUserId(e.target.value)}></SlInput>
            <SlInput label="Search pfps" onSlInput={(e) => setPfpFilter(e.target.value)}></SlInput>
            {renderImages()}
            {renderSelectedPfp()}
            <SlButton onClick={() => setIsloggedIn(true)} disabled={!chosenPfp}>PLAY</SlButton>
        </div>
    }

    return <>
        {isLoggedIn ? props.children : renderLoginForm()}
    </>;
}

export default LoginScreen;