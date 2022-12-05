import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { UpdateScenarioModal } from "./UpdateScenarioModal";

interface ScenarioHeaderProps {
    scenario: any;
    onClick: () => void;
}

function ScenarioRow(props: ScenarioHeaderProps) {
    return <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
        <TableCell component="th" scope="row">
            {props.scenario.name}
        </TableCell>
        <TableCell align="right">
            {props.scenario.playCount}
        </TableCell>
        <TableCell align="right">
            <UpdateScenarioModal scenario={props.scenario} />

            <IconButton color="error" onClick={props.onClick}>
                <Delete />
            </IconButton>
        </TableCell>
    </TableRow>;
}

export default ScenarioRow;
