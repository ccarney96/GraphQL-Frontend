import { gql } from "@apollo/client";

const SEARCH_ROUTINES = gql`
    query FindRoutine($searchQuery: String!) {
        findRoutine(searchQuery: $searchQuery) {
            id
            name
            description
            author
        }
    }
`

const GET_ROUTINES_BY_AUTHOR = gql`
    query RoutinesByAuthor($name: String!, $author: String) {
        routines(filter: { name: $name, author: $author }) {
            id
            name
            description
            author
        }
    }
`;

const ALL_ROUTINES = gql`
    query GetAllRoutines
    {
        routines(filter: { name: ""})
        {
            id
            name
            description
            author
        }
    }
`

const PAGINATED_ROUTINES = gql`
    query GetPaginatedRoutines($first: Int, $offset: Int, $filter: RoutineFilterInput) {
        routinesWithCount(first: $first, offset: $offset, filter: $filter) {
            routines {
                id
                name
                description
                author
            }
            count
        }
    }
`;

const ROUTINE_DETAILS_QUERY = gql`
    query GetRoutineById($id: ID)
    {
        routine(id: $id)
        {
            id
            name
            description
            author
            scenarios
            {
                id
                name
                playCount
            }
        }
    }
`

export { SEARCH_ROUTINES, ALL_ROUTINES, ROUTINE_DETAILS_QUERY, GET_ROUTINES_BY_AUTHOR, PAGINATED_ROUTINES };
