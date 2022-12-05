import { Box, Button, Divider, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_ROUTINES } from "../queries/Queries";

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

const ADD_ROUTINE = gql`
    mutation AddRoutine($name: String!, $description: String!) {
        createRoutine(name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

export const CreateRoutineModal = () => {
    const [open, setOpen] = useState(false);

    const [formState, setFormState] = useState({
        name: '',
        description: ''
    });

    const [addRoutine, { data, loading, error }] = useMutation(ADD_ROUTINE, {
        refetchQueries: [
            { query: ALL_ROUTINES }
        ]
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        addRoutine({
            variables: {
                ...formState
            }
        }).then(r => handleClose());
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
            }} onClick={() => setOpen(true)}>Create Routine</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a new routine
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
                                id="description-input"
                                name="description"
                                label="Description"
                                type="text"
                                value={formState.description}
                                onChange={handleInputChange}
                                fullWidth
                            />

                            <Box sx={{
                                display: "flex",
                                justifyContent: "end"
                            }}>
                                <Button variant="outlined" type={'submit'} disabled={
                                    formState.name === '' || formState.description === ''
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
