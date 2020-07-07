import Knex, { Config } from "knex";

import { Configs, configuration } from "../knexfile";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = (configuration as Configs)[environment];

const knex = Knex(environmentConfig as Config);

export default knex;
