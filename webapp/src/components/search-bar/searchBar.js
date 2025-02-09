import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const SearchBar = () => {
    return <SlInput placeholder="Search..." size="Medium" style={{paddingLeft: "70px"}}>
        <SlIcon name="search" slot="suffix" className="searchIcon"></SlIcon>
    </SlInput>;
}

export default SearchBar;
