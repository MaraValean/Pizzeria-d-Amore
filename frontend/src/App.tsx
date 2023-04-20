import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllPizzas } from "./components/Pizza/PizzaShowAll";
import { PizzaDetails } from "./components/Pizza/PizzaDetails";
import { PizzaAdd } from "./components/Pizza/PizzaAdd";
import { PizzaUpdate } from "./components/Pizza/PizzaUpdate";
import { PizzaDelete } from "./components/Pizza/PizzaDelete";
import { PizzaMostOrdered } from "./components/Pizza/PizzaMostOrdered";


function App() {
	return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/pizza" element={<AllPizzas />} />
          <Route path="/pizza/:pizzaId/details" element ={<PizzaDetails/>} />
          <Route path="/pizza/add" element={<PizzaAdd />} />
          <Route path="/pizza/:pizzaId/edit" element={<PizzaUpdate/>} />
          <Route path="/pizza/:pizzaId/delete" element={<PizzaDelete/>} />
          <Route path="/pizza/mostOrdered" element={<PizzaMostOrdered />} />
		
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App;