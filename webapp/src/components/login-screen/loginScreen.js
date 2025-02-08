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
    const [jokePlaceholder, setJokePlaceholder] = useState("");

    const sillies = [":3", "Hatch Gedyum", "Wallbreaks were a mistake", "Ctrl + R", "Baby Nyx", "Sugma", "Oopi Goopi", "Klumbus", "The Mighty Squnch", "56.201.98.16", "I'm right behind you", "Uutch", "Jet Jaguar", "Squeedle", "It's like minecraft", "Zamboney", "Hoofus Goofus", "Mmm paint chip :)", "Boiled Peanut", "Meatball Hero", "Extra Parmesan", "Ohh I'll do Lemon Pepper, please", "Calabrese Nablidon", "Personally, I prefer Digimon", "Draft on, Bestie", "The Lions Win Easily"];

    useEffect(() => {
        setJokePlaceholder(sillies[Math.floor(Math.random() * sillies.length)] + "...");
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
                <div className={getClassName(img)} onClick={() => handleClick(img)}>
                    <img src={img.fileName} alt={img.fileName} />
                </div>)}
        </div>;
    }

    const renderSelectedPfp = () => {
        if (!props.pfp) {
            return;
        }

        return;
    }

    const handlePlayClick = () => {
        localStorage.setItem("cachedName", holderText);
        props.setUserId(holderText);
        setIsloggedIn(true);
    }

    const handleNameChange = (e) => {
        setHolderText(e.target.value);

        if (e.target.value === "") {
            localStorage.setItem("cachedName", "");
        }
    }

    const renderLoginForm = () => {
        return <div className="loginScreenContainer ">
            <SlInput
                size="Medium"
                value={holderText}
                className="customInput"
                label="What's your name?"
                placeholder={jokePlaceholder}
                onSlInput={(e) => handleNameChange(e)}>
            </SlInput>
            <SlInput
                size="Medium"
                className="customInput"
                label="Avatar"
                placeholder="Search..."
                onSlInput={(e) => setPfpFilter(e.target.value)}>
                <SlIcon className="searchIcon" name="search" slot="suffix"></SlIcon>
            </SlInput>
            {renderImages()}
            <div className="loginFooter">
                {props.pfp && <div className="pfpDisplay">
                    {/* //TODO: this needs to be a badge */}
                    <img src={props.pfp.fileName} alt={props.pfp.fileName} />
                    <div>
                        <div>Name: {props.pfp.imageName}</div>
                        <div>Artist: {props.pfp.artistName}</div>
                    </div>
                </div>}
                <SlButton
                    className="sl-button primary"
                    variant="primary"
                    onClick={() => handlePlayClick()}
                    disabled={!props.pfp || !holderText}>
                    Play
                </SlButton>
            </div>
        </div>
    }

    return <>
        {isLoggedIn ? props.children : renderLoginForm()}
    </>;
}

export default LoginScreen;