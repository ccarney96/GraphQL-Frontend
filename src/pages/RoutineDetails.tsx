import {
    Avatar, Box, Button,
    Card,
    CardContent,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ArrowBack, Delete, Edit, Folder } from "@mui/icons-material";
import { AddScenarioModal } from "../components/AddScenarioModal";
import { ROUTINE_DETAILS_QUERY } from "../queries/Queries";
import { DELETE_SCENARIO } from "../mutations/Mutations";
import ScenarioRow from "../components/ScenarioRow";

const RoutineDetails = () => {
    const { routineId } = useParams<{ routineId: string }>();

    const navigate = useNavigate();

    const { data, loading, error } = useQuery(
        ROUTINE_DETAILS_QUERY,
        { variables: { id: routineId } }
    );

    const [deleteScenario] = useMutation(DELETE_SCENARIO, {
        refetchQueries: [
            {
                query: ROUTINE_DETAILS_QUERY, variables: {
                    id: routineId
                }
            }
        ]
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <Container>
            <Card>
                {/*add a back button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                        <ArrowBack />
                        Back
                    </Button>
                </Box>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        {data?.routine.name}
                    </Typography>

                    <Typography variant="body1" gutterBottom align="center">
                        {data?.routine.description}
                    </Typography>

                    <Divider />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 2
                    }}>
                        <Typography variant="h5">
                            Scenarios
                        </Typography>

                        <AddScenarioModal routineId={routineId} />
                    </Box>

                    <TableContainer component={Paper} sx={{
                        mt: 2
                    }}>
                        <Table sx={{
                            border: 1,
                            borderColor: 'divider'
                        }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Scenario Name</b> </TableCell>
                                    <TableCell align="right"><b>Play Count</b></TableCell>
                                    <TableCell align="right">
                                        <b>Actions</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.routine.scenarios.map((scenario: any) => (
                                    <ScenarioRow key={scenario.name} scenario={scenario} onClick={() => {
                                        deleteScenario({
                                            variables: {
                                                id: +scenario.id
                                            }
                                        }).then(
                                            x => console.log(x)
                                        )
                                    }} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                {/*    card footer */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2
                }}>
                    <Typography variant="h6">
                        Created by: {data?.routine.author}
                    </Typography>
                </Box>
            </Card>

            {/*{data?.routine.scenarios && <h1>{data.routine.scenarios}</h1>}*/}
        </Container>
    );
}

export default RoutineDetails;
