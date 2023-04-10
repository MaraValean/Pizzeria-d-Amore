const PROD_BACKEND_API_URL = "/pizzeriaApp";
const DEV_BACKEND_API_URL ="http://ec2-16-16-90-247.eu-north-1.compute.amazonaws.com/pizzeriaApp";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;
