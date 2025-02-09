import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const SearchBar = (props) => {
    const handleType = (e) => {
        props.setQuery(e.target.value);
    }

    return <SlInput
        placeholder="Search..."
        size="Medium"
        onSlInput={(e) => handleType(e)}>
        <SlIcon name="search" slot="suffix" className="searchIcon" value={props.query}></SlIcon>
    </SlInput>;
}

export default SearchBar;
