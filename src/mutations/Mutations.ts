import { gql } from "@apollo/client";

const DELETE_SCENARIO = gql`
    mutation DeleteScenario($id: Int) {
        deleteScenario(id: $id) {
            id
        }
    }
`

const DELETE_ROUTINE = gql`
    mutation DeleteRoutine($id: ID) {
        deleteRoutine(id: $id) {
            id
        }
    }
`;

const UPDATE_SCENARIO = gql`
    mutation UpdateScenario($id: ID, $name: String, $playCount: Int) {
        updateScenario(id: $id, name: $name, playCount: $playCount) {
            id
            name
            playCount
        }
    }
`;

const UPDATE_ROUTINE = gql`
    mutation UpdateRoutine($id: ID, $name: String, $description: String) {
        updateRoutine(id: $id, name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

export { DELETE_SCENARIO, DELETE_ROUTINE, UPDATE_SCENARIO, UPDATE_ROUTINE };
