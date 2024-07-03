const app = require("./src/app");

const PORT  = process.env.PORT || 3057

const server = app.listen(PORT, () => {
    console.log(`Web server eCommerce is running on port ${PORT}!`);
    });

process.on('SIGINT',() =>{
    server.close();
    console.log('Bye bye!');
    process.exit();
})