import { Box, Container, Grid, IconButton, InputAdornment, Pagination, TextField } from "@mui/material";
import { useQuery } from "@apollo/client";
import RoutineCard from "../components/RoutineCard";
import { CreateRoutineModal } from "../components/CreateRoutineModal";
import { RoutineSearchBar } from "../components/RoutineSearchBar";
import { ChangeEvent, useState } from "react";
import { ALL_ROUTINES, PAGINATED_ROUTINES } from "../queries/Queries";

const getPagination = (page: number, first: number) => {
    const offset = page * first - first;
    return {
        offset,
        first
    }
}

export const Home = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [routines, setRoutines] = useState([]);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log('test')
    };

    // query for all routines to get the count
    const { loading, data, error} = useQuery(ALL_ROUTINES, {
        onCompleted: (data) => {
            const pages = Math.ceil(data.routines.length / limit);
            setTotalPages(pages);
            setRoutines(data.routines);
        },
            // variables: {
            //     ...getPagination(page, limit),
            //     filter: {
            //         name: '',
            //     }
            // }
    });

    // query for paginated routines
    // const { loading, error, data } = useQuery(PAGINATED_ROUTINES, {
    //     variables: {
    //         ...getPagination(page, limit),
    //         filter: {
    //             name: searchTerm,
    //         }
    //     }
    // });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <Container>

            <RoutineSearchBar routines={routines} setRoutines={setRoutines}/>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
            }}
            >
                {/*<p>Total items: {data.routines.length}</p>*/}
                <CreateRoutineModal />
            </Box>

            {!loading && routines && (<Grid container spacing={2} pt={2}>
                {routines.map((routine: any) => (
                    <Grid item xs={12} sm={6} md={4} key={routine.id} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <RoutineCard routine={routine} />
                    </Grid>
                ))}
            </Grid>)}

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                paddingY: 2
            }}>
                <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Box>
        </Container>
    );
}
