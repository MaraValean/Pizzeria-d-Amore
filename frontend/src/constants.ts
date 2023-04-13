const PROD_BACKEND_API_URL = "/pizzeriaApp";
const DEV_BACKEND_API_URL ="http://ec2-13-48-196-82.eu-north-1.compute.amazonaws.com/pizzeriaApp";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;
