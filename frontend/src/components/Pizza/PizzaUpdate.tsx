import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const PizzaUpdate = () => {
    const navigate = useNavigate();
    const {pizzaId} = useParams();

    const [loading, setLoading] = useState(true);
    const [pizza, setPizza] = useState({
        sort:"",
        sauce:"",
        price:0,
        weight:0,  
        chef:1,
    });

    useEffect(() => {
        const fetchPizza = async () => {
            const response = await fetch(`${BACKEND_API_URL}/pizza/${pizzaId}/`);
            const pizza = await response.json();
            setPizza({
                sort:pizza.sort,
                sauce:pizza.sauce,
                price:pizza.price,
                weight:pizza.weight,  
                chef:pizza.chef,
            })
            setLoading(false);
            console.log(pizza);
        };
        fetchPizza();
    }, [pizzaId]);

    const updatePizza =async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/pizza/${pizzaId}/`, pizza);
            navigate(`/pizza/${pizzaId}/details`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/pizza`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updatePizza}>
					<TextField
							id="sort"
							label="Sort"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPizza({ ...pizza, sort: event.target.value })}
						/>
						<TextField
							id="sauce"
							label="Sauce"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPizza({ ...pizza, sauce: event.target.value })}
						/>
                        <TextField
							id="price"
							label="Price"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPizza({ ...pizza, price: +event.target.value })}
						/>
                         <TextField
							id="weight"
							label="Weight"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPizza({ ...pizza, weight: +event.target.value })}
						/>

						<Button type="submit">Update Pizza</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    )
};