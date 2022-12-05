import { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { GET_ROUTINES_BY_AUTHOR, SEARCH_ROUTINES } from "../queries/Queries";

const searchBarStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 2,
    paddingY: 2
}

export const RoutineSearchBar = ({ routines, setRoutines }: any) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [searchRoutines, { loading, error, data }] = useLazyQuery(GET_ROUTINES_BY_AUTHOR, {
        onCompleted: (data) => {
            console.log(data);
            setRoutines(data.routines);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const onSearch = (e: any) => {
        e.preventDefault();
        searchRoutines({
            variables: {
                name: searchTerm,
                author: searchTerm
            }
        });
    }

    const handleInputChange = (e: any) => {
        setSearchTerm(e.target.value);
    }

    return (
        <Box sx={searchBarStyle}>
            <TextField
                id="search"
                label="Search by name or author"
                variant="outlined"
                value={searchTerm}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="search"
                                onClick={onSearch}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }} />
        </Box>
    );
}
