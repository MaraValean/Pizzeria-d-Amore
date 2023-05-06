import { Card, CardActions, CardContent, CircularProgress, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Pizza } from "../../models/Pizza";
import { Chef } from "../../models/Chef";
import { BACKEND_API_URL } from "../../constants";

export const PizzaDetails = () => {
	const { pizzaId } = useParams();
	const [loading, setLoading] = useState(false);
	const [pizza, setPizza] = useState<Pizza>();
	const [chef, setChef] = useState<Chef>();

	useEffect(() => {
		setLoading(true);
		const fetchPizza = async () => {
			const response = await fetch(`${BACKEND_API_URL}/pizza/${pizzaId}/`);
			const pizza = await response.json();
			setPizza(pizza);

			if (pizza && pizza.chef) {
				const chefResponse = await fetch(`${BACKEND_API_URL}/chef/${pizza.chef}`);
				const chef = await chefResponse.json();
				setChef(chef);
			}

			setLoading(false);
		};
		fetchPizza();
	}, [pizzaId]);

	return (
		<Container>
			{!loading && pizza === undefined && <CircularProgress />}
			{!loading && pizza !== undefined && pizza.chef && (
				<Card>
					<CardContent>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/pizza`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						<h1>Pizza Details</h1>
						<p>Sortiment: {pizza?.sort}</p>
						<p>Sauce: {pizza?.sauce}</p>
						<p>Price: {pizza?.price} RON</p>
						<p>Weight: {pizza?.weight} grams </p>
						<p>
							Chef:{" "}
							{chef ? `${chef.first_name} ${chef.last_name}` : ""}
						</p>
						<p>Ordered one piece at table:</p>
						<ul>
							{pizza?.orders?.map((order) => (
								<li key={order.id}>{order.table}</li>
							))}
						</ul>
						<p>Calories: {pizza?.calories} kcal</p>
					</CardContent>
					<CardActions>
						<IconButton
							component={Link}
							sx={{ mr: 3 }}
							to={`/pizza/${pizzaId}/edit`}
						>
							<EditIcon />
						</IconButton>

						<IconButton
							component={Link}
							sx={{ mr: 3 }}
							to={`/pizza/${pizzaId}/delete`}
						>
							<DeleteForeverIcon sx={{ color: "red" }} />
						</IconButton>
					</CardActions>
				</Card>
			)}
		</Container>
	);
};
