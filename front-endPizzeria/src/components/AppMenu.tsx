import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import GradeIcon from '@mui/icons-material/Grade';

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }} >
				<Toolbar sx={{ backgroundColor: "firebrick" }}>
					<IconButton
						component={Link}
						to="/"
						size="small"
						edge="start"
						color="inherit"
						sx={{ mr: 2 }}>
						<LocalDiningIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Pizzeria d'Amore
					</Typography>
					<Button
						variant={path.startsWith("/pizza") ? "outlined" : "text"}
						to="/pizza"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalPizzaIcon />}>
						pizza
					</Button>
					<Button
						variant={path.startsWith("/pizza") ? "outlined" : "text"}
						to="/pizza/mostOrdered"
						component={Link}
						color="inherit"
						sx={{ mr: 7 }}
						startIcon={<GradeIcon />}>
						most ordered pizza
					</Button> 
				</Toolbar>
			</AppBar>
		</Box>
	);
};