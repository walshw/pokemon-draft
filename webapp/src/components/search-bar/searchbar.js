import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import './searchBar.css';

const SearchBar = () => {
    return <SlCard className="searchBar">
        <SlInput placeholder="Search..." >
            <SlIcon name="search" slot="suffix"></SlIcon>
        </SlInput>
    </SlCard>;
}

export default SearchBar;
