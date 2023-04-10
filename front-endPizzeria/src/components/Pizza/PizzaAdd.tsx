import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Pizza } from "../../models/Pizza";
import { Chef } from "../../models/Chef";
import { debounce } from "lodash";

export const PizzaAdd = () => {
    const navigate = useNavigate();
    const [pizza, setPizza] = useState({
        sort:"",
        sauce:"",
        price:0,
        weight:0,  
        chef:1,
    });

    const [chef, setChef] = useState<Chef[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Chef[]>(
				`${BACKEND_API_URL}/chef?query=${query}`
			);
			const data = await response.data;
			setChef(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    const addPizza = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/pizza/`, pizza);
			navigate("/pizza");
		} catch (error) {
			console.log(error);
		}
	};
    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

    return (
        <Container>
			<Card>
				<CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/pizza`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addPizza}>
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
						<Autocomplete
							id="chef_id"
							options={chef}
							getOptionLabel={(option) => `${option.first_name} - ${option.last_name}`}
							renderInput={(params) => <TextField {...params} label="Chef" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setPizza({ ...pizza, chef: value.id });
								}
							}}
						/>

						<Button type="submit">Add Pizza</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
};