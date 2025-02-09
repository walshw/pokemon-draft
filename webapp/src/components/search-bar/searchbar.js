import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const SearchBar = () => {
    return <SlInput placeholder="Search..." size="Medium" >
        <SlIcon name="search" slot="suffix"></SlIcon>
    </SlInput>;
}

export default SearchBar;
