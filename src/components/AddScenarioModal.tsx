import { Box, Button, Divider, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Add } from "@mui/icons-material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ADD_SCENARIO = gql`
    mutation AddScenario($name: String!, $playCount: Int!, $routineId: Int) {
        addScenario(name: $name, playCount: $playCount, routineId: $routineId) {
            id
            name
            playCount
        }
    }
`;

const ROUTINE_DETAILS_QUERY = gql`
    query GetRoutineById($id:ID) {
        routine(id: $id) {
            id
            name
            description
            scenarios {
                id
                name
                playCount
            }
        }
    }
`

type AddScenarioProps = {
    routineId: string | undefined;
}

export const AddScenarioModal = ({ routineId }: AddScenarioProps) => {
    const [open, setOpen] = useState(false);

    const [formState, setFormState] = useState({
        name: '',
        playCount: 0
    });

    const [addScenario, { data, loading, error }] = useMutation(ADD_SCENARIO, {
        refetchQueries: [
            {
                query: ROUTINE_DETAILS_QUERY, variables: {
                    id: routineId
                }
            }
        ]
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        addScenario({
            variables: {
                name: formState.name,
                playCount: Number(formState.playCount),
                routineId: Number(routineId)
            }
        }).then(x => {
            handleClose();
        })
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button variant="contained" sx={{
                marginBottom: 2,
            }} onClick={() => setOpen(true)}>
                <Add />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a new scenario
                    </Typography>

                    <Divider sx={{
                        my: 2
                    }} />

                    <form onSubmit={onSubmit}>
                        <Stack direction={'column'} gap={2}>
                            <TextField
                                id="name-input"
                                name="name"
                                label="Name"
                                type="text"
                                value={formState.name}
                                onChange={handleInputChange}
                                fullWidth
                            />

                            <TextField
                                id="playCount-input"
                                name="playCount"
                                label="Play Count"
                                type="number"
                                value={formState.playCount}
                                onChange={handleInputChange}
                                fullWidth
                            />

                            <Box sx={{
                                display: "flex",
                                justifyContent: "end"
                            }}>
                                <Button variant="outlined" type={'submit'} disabled={
                                    formState.name === '' || formState.playCount === 0
                                }>
                                    Create
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
