import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApioptions, GEO_API_URL } from "../../api"

const Search = ({onSearchChange}) => { // onSearchChange is the function passed from the parent component

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        // try {
        //     const response = await fetch(
        //         `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        //         geoApioptions
        //     );
        //     const result = await response.json();
        //     console.log(result);
        //     return {
        //         options: result.data.map((city) => ({
        //             value: city.id,
        //             label: `${city.name}, ${city.country}`,
        //         })),
        //     };
        // } catch (error) {
        //     console.error(error);
        //     return {
        //         options: [],
        //     };
        // }

        return fetch ( 
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, 
            geoApioptions
        )
        .then( (response) => response.json() )
        .then( (response) => {
            console.log(response)
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`
                    }
                }),
            };
        })
        .catch( (err) => console.error(err) );
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder = "Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;