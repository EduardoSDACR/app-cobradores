import App from "./app";
import { connectToMongodb } from "./database";

connectToMongodb();
const app = new App();
app.start();
