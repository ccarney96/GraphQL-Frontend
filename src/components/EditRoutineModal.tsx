import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Divider,
    IconButton,
    Modal, Stack,
    TextField,
    Typography
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { UPDATE_ROUTINE } from "../mutations/Mutations";
import { PAGINATED_ROUTINES } from "../queries/Queries";

type EditRoutineModalProps = {
    routine: {
        id: string;
        name: string;
        description: string;
    }
}

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


export const EditRoutineModal = ({ routine }: EditRoutineModalProps) => {
    const [open, setOpen] = useState(false);

    const [formState, setFormState] = useState({
        name: routine.name,
        description: routine.description
    });

    const [updateRoutine, { data, loading, error }] = useMutation(UPDATE_ROUTINE, {
        refetchQueries: [
            {
                query: PAGINATED_ROUTINES
            }
        ]
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        updateRoutine({
            variables: {
                id: Number(routine.id),
                name: formState.name,
                description: formState.description,
            }
        }).then(x => {
            console.log(x);
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
                        Update {routine.name}
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
                                multiline
                                sx={{
                                    flexGrow: 1
                                }}
                            />

                            <Box sx={{
                                display: "flex",
                                justifyContent: "end"
                            }}>
                                <Button variant="outlined" type={'submit'} disabled={
                                    formState.name === '' || formState.description === ''
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
