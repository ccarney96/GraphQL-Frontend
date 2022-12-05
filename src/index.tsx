import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    routines: {
                        merge(existing = [], incoming) {
                            return [...existing, ...incoming];
                        }
                    }
                }
            }
        }
    })
});

root.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </ApolloProvider>
);
