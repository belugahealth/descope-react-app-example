import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "@descope/react-sdk";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/css/App.css";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import RTLLayout from "./layouts/rtl";
import theme from "./theme/theme";

const App = () => {
	const { authenticated, me } = useAuth();
	useEffect(() => {
		if (authenticated) {
		// when the app is loaded - get logged in user details
		me();
		}
	}, [authenticated]);

  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/rtl`} component={RTLLayout} />
            <Redirect from="/" to="/admin" />
          </Switch>
        </HashRouter>
      </React.StrictMode>
    </ChakraProvider>
  );
};

const AppRoot = () => {
	const queryParams = new URLSearchParams(window.location.search)
	if (queryParams.get("projectId")) {
		localStorage.setItem('projectId', queryParams.get("projectId"));
	}
	const projectId = localStorage.getItem('projectId') || process.env.REACT_APP_DESCOPE_PROJECT_ID

	console.log("starting...");
	console.log(`projectId=${projectId}`);
	return (
		<AuthProvider
			projectId={projectId}
		>
		 <App />
		</AuthProvider>
	)
  }
  
ReactDOM.render(
	<AppRoot />,
  	document.getElementById("root")
);