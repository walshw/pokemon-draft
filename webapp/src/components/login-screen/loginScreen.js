import { useState, useEffect } from "react";
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import pfps from '../../data/images.json';

import "./loginScreen.css";

function LoginScreen(props) {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [pfpFilter, setPfpFilter] = useState("");
    const [pfpState, setPfpState] = useState(pfps);

    const [holderText, setHolderText] = useState("");

    useEffect(() => {
        const cachedName = localStorage.getItem("cachedName");

        if (cachedName) {
            setHolderText(cachedName);
        }
    }, []);

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

    const handlePlayClick = () => {
        localStorage.setItem("cachedName", holderText);
        setIsloggedIn(true);
    }

    const handleNameChange = (e) => {
        props.setUserId(e.target.value);
        setHolderText(e.target.value);
    }

    const renderLoginForm = () => {
        return <div className="loginScreenContainer">
            <SlInput value={holderText} className="customInput" label="What's your name?" onSlInput={(e) => handleNameChange(e)}>
            
            </SlInput>
            <SlInput className="customInput" label="Search pfps" onSlInput={(e) => setPfpFilter(e.target.value)}>
                <SlIcon name="search" slot="suffix"></SlIcon>
            </SlInput>
            {renderImages()}
            {renderSelectedPfp()}
            <SlButton onClick={() => handlePlayClick()} disabled={!props.pfp}>PLAY</SlButton>
        </div>
    }

    return <>
        {isLoggedIn ? props.children : renderLoginForm()}
    </>;
}

export default LoginScreen;