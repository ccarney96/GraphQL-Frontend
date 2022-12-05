import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, IconButton, Stack, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { ALL_ROUTINES } from "../queries/Queries";
import { DELETE_ROUTINE } from "../mutations/Mutations";
import { EditRoutineModal } from "./EditRoutineModal";

type RoutineCardProps = {
    routine: {
        id: string;
        name: string;
        description: string;
        author: string;
    }
}

export default function RoutineCard({ routine }: RoutineCardProps) {

    const navigate = useNavigate();

    const [deleteRoutine] = useMutation(DELETE_ROUTINE, {
        refetchQueries: [
            {
                query: ALL_ROUTINES
            }
        ]
    });

    const navigateToRoutineDetails = () => {
        console.log("navigate to routine details");
        navigate(`/${routine.id}`);
    }

    const onDeleteRoutine = (e: any) => {
        e.stopPropagation();
        deleteRoutine({
            variables: {
                id: routine.id
            }
        });
    }

    return (
        <Card sx={{ width: "100%" }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 1,
                borderBottom: 1,
                borderColor: 'divider',
                alignItems: 'center'
            }}>
                <Stack direction="row" spacing={1} alignContent={"center"}>
                    <Chip sx={{
                        fontWeight: 'bold',
                    }} label="Clicking" color="error" size="small" />
                    <Chip sx={{
                        fontWeight: 'bold',
                    }} label="Tracking" color="primary" size="small" />
                </Stack>
                <Stack direction="row" spacing={1}>
                    <EditRoutineModal routine={routine} />
                    <IconButton onClick={onDeleteRoutine}>
                        <Delete color={"error"} />
                    </IconButton>
                </Stack>
            </Box>
            <CardContent>
                <Typography variant="h5" component="div" align="center">
                    {routine.name}
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5, minHeight: 48 }} color="text.secondary" align="center">
                    {routine.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button sx={{
                    flexGrow: 1
                }} size="small" variant={'outlined'} onClick={navigateToRoutineDetails}>View</Button>
            </CardActions>

            {/*    add author to bottom right in secondary text */}
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        Created by
                    </Typography>

                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                        {routine.author}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
