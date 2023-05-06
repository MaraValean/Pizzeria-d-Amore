// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   CircularProgress,
//   Container,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tooltip,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditIcon from "@mui/icons-material/Edit";
// import ReadMoreIcon from "@mui/icons-material/ReadMore";
// import { Link } from "react-router-dom";
// import { BACKEND_API_URL } from "../../constants";

// interface Chef {
//   id: number;
//   first_name: string;
//   last_name: string;
//   salary: number;
//   seniority: number;
//   shift: string;
// }

// export const AllChefs = () => {
//   const [loading, setLoading] = useState(false);
//   const [chefs, setChefs] = useState<Chef[]>([]);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`${BACKEND_API_URL}/chef/`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChefs(data);
//         setLoading(false);
//       });
//   }, []);

//   const sortChefs = () => {
//     const sortedChefs = [...chefs].sort((a: Chef, b: Chef) => {
//       if (a.salary < b.salary) {
//         return -1;
//       }
//       if (a.salary > b.salary) {
//         return 1;
//       }
//       return 0;
//     });
//     console.log(sortedChefs);
//     setChefs(sortedChefs);
//   };

//   return (
//     <Container>
//       <h1>All chefs</h1>

//       {loading && <CircularProgress />}
//       {!loading && chefs.length === 0 && <p>No chefs found</p>}
//       {!loading && (
//         <Button color="inherit" onClick={sortChefs}>
//           Sort chefs by salary
//         </Button>
//       )}
//       {!loading && (
//         <IconButton component={Link} sx={{ mr: 3 }} to={`/chef/add`}>
//           <Tooltip title="Add a new chef" arrow>
//             <AddIcon color="inherit" />
//           </Tooltip>
//         </IconButton>
//       )}
//       {!loading && chefs.length > 0 && (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>#</TableCell>
//                 <TableCell align="left">Name</TableCell>
//                 <TableCell align="right">Salary</TableCell>
//                 <TableCell align="right">Seniority</TableCell>
//                 <TableCell align="right">Shift</TableCell>
//                 <TableCell align="center">Operations</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {chefs.map((chef: Chef, index) => (
//                 <TableRow key={chef.id}>
//                   <TableCell component="th" scope="row">
//                     {index + 1}
//                   </TableCell>
//                   <TableCell component="th" scope="row">
//                     <Link
//                       to={`/chef/${chef.id}/details`}
//                       title="View chef details"
//                     >
//                       {chef.first_name} {chef.last_name}
//                     </Link>
//                   </TableCell>
//                   <TableCell align="right">{chef.salary}</TableCell>
//                   <TableCell align="right">{chef.seniority}</TableCell>
//                   <TableCell align="right">{chef.shift}</TableCell>
                 
