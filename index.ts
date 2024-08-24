import app from "./src/app";

const PORT = process.env.PORT || 3000;

(async () => {
    app.listen(PORT, () => {
        console.log(`[SERVER] Running at port: ${PORT}`);
    });
})();
