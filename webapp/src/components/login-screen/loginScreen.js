import { useState, useEffect } from "react";
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';
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

    const sillies = [":3", "Hatch Gedjum", "Wallbreaks were a mistake", "Ctrl + R", "Baby Nyx", "Sugma", "Oopi Goopi", "Klumbus", "The Mighty Squnch", "56.201.98.16", "I'm right behind you", "Uutch", "Jet Jaguar", "Squeedle", "It's like minecraft", "Zamboney", "Hoofus Goofus", "Mmm paint chip :)", "Boiled Peanut", "Meatball Hero", "Extra Parmesan", "Ohh I'll do Lemon Pepper, please", "Calabrese Nablidon", "Personally, I prefer Digimon", "Draft on, Bestie", "1 Billion Lions every time", "Ursaluna Jumpscare", "You can always be kinder"];

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

    const handlePlayClick = () => {
        localStorage.setItem("cachedName", holderText);
        props.setUserId(holderText);
        setIsloggedIn(true);
    }

    const handleNameChange = (e) => {
        setHolderText(e.target.value.trim());

        // TODO: When caching pfp choice, clear cache here too
        if (e.target.value === "") {
            localStorage.setItem("cachedName", "");
        }
    }

    const renderPfpDisplay = () => {
        let imageName = "";
        let artistName = "";
        const directions = [];

        if (props.pfp) {
            imageName = props.pfp.imageName
            artistName = props.pfp.artistName
        } else {
            directions.push("Please pick a lil buddy :3");
        }

        if (holderText.trim() === "") {
            directions.push("Please enter a name :|");
        }

        const avatar = props.pfp ?
            <SlAvatar className="myAvatar" image={props.pfp.fileName}></SlAvatar>
            :
            <SlAvatar className="myAvatar" label="Circle avatar"></SlAvatar>;

        return <div className="pfpDisplay">
            {avatar}
            {props.pfp && holderText.trim() !== ""
                ?
                <div>
                    <div>Name: {imageName}</div>
                    <div>Artist: {artistName}</div>
                </div>
                :
                <div className="directionContainer">{directions.map((directionText, idx) => <div>{idx+ 1 + ") "}{directionText}</div>)}</div>}
        </div>
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
                {renderPfpDisplay()}
                <SlButton
                    className="sl-button primary"
                    variant="primary"
                    onClick={() => handlePlayClick()}
                    disabled={!props.pfp || !holderText || holderText.trim() === ""}>
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