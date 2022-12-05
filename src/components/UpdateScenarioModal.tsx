import { Box, Button, Divider, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Add, Delete, Edit } from "@mui/icons-material";
import { ROUTINE_DETAILS_QUERY } from "../queries/Queries";
import { UPDATE_SCENARIO } from "../mutations/Mutations";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const UpdateScenarioModal = ({ scenario }: any) => {
    const [open, setOpen] = useState(false);

    const [updateScenario, { data, loading, error }] = useMutation(UPDATE_SCENARIO, {
        refetchQueries: [
            {
                query: ROUTINE_DETAILS_QUERY, variables: {
                    id: scenario.routineId
                }
            }
        ],
        onCompleted: () => handleClose()
    });

    const [formState, setFormState] = useState({
        name: scenario.name,
        playCount: scenario.playCount
    });

    const handleInputChange = (e: any) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        updateScenario({
            variables: {
                id: scenario.id,
                ...formState
            }
        }).then(r => console.log(r));
    }

    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton color="primary" onClick={() => setOpen(true)}>
                <Edit />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update {scenario.name}
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
                                    Save
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
