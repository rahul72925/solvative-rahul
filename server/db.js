import postgres from "postgres";
import { getEnv } from "./utils/index.js";
import "dotenv/config";

const SQL = postgres(getEnv("POSTGRES_DATA_BASE_URL"));

export default SQL;
