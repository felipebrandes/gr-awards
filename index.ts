import app from "./src/app";
import { migrateDB } from "./src/config/database";

const PORT = process.env.PORT || 3000;

(async () => {
    await migrateDB();

    app.listen(PORT, () => {
        console.log(`[SERVER] Running at port: ${PORT}`);
    });
})();
