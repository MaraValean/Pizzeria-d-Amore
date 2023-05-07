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
	Button,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Pizza } from "../../models/Pizza";
import {Chef} from "../../models/Chef";
import { BACKEND_API_URL } from "../../constants";

export const AllPizzas = () => {
	const [loading, setLoading] = useState(false);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);

	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const current = (page - 1) * pageSize + 1;
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

	const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    }

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }


	const fetchPizza = async() => {
		setLoading(true);
		const response = await fetch(`${BACKEND_API_URL}/pizza/?page=${page}&pageSize=${pageSize}`);
		const {count, next, previous, results} = await response.json();
		setPizzas(results);
		setTotalRows(count);	
		setIsLastPage(!next);
		setLoading(false);

	};

	useEffect(() => {
		fetchPizza();
	}, [page]);

	const sortPizza = () => {
        const sortedPizzas = [...pizzas].sort((a: Pizza, b:Pizza) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;

        })
        console.log(sortedPizzas);
        setPizzas(sortedPizzas);
    }

	return (
		<Container>
			<h1>All pizzas</h1>

			{loading && <CircularProgress />}
			{!loading && pizzas.length === 0 && <p>No pizzas found</p>}
			{!loading && (
            <Button color="inherit" onClick={sortPizza}>
                Sort pizzas by price
            </Button>
        	)}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/pizza/add`}>
					<Tooltip title="Add a new pizza" arrow>
						<AddIcon color="inherit" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && pizzas.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="left">Sort</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Sauce</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{pizzas.map((pizza:Pizza, index) => (
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
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/pizza/${pizza.id}/details`}>
											<Tooltip title="View pizza details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/pizza/${pizza.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/pizza/${pizza.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};