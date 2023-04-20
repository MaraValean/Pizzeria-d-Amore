import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { PizzaCount } from "../../models/PizzaCount";


export const PizzaMostOrdered = () => {
    const [loading, setLoading] = useState(false);
    const [pizzas, setPizza] = useState<PizzaCount[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/pizza/mostOrdered/`)
            .then(response => response.json())
            .then(data => {
                setPizza(data);
                setLoading(false);
            }
            );
    }, []);

    console.log(pizzas);

    return (
        <Container >
        <h1>Top 3 pizza favourites</h1>
        {loading && <CircularProgress />}

        {!loading && pizzas.length == 0 && <div>No pizzas found!</div>}

        {!loading && pizzas.length > 0 && (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Sort</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Sauce</TableCell>
                            <TableCell align="center">Order Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pizzas.map((pizza:PizzaCount, index) => (
                            <TableRow key={pizza.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
										<Link to={`/pizza/${pizza.id}/details`} title="View pizza details">
											{pizza.sort}
										</Link>
								</TableCell>
                                <TableCell align="right">{pizza.price}</TableCell>
								<TableCell align="right">{pizza.sauce}</TableCell>
                                <TableCell align="center">{pizza.order_count}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )}
    </Container>
    )
}