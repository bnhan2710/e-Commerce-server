const app = require("./src/app");

const PORT = 3055

const server = app.listen(PORT, () => {
    console.log(`Web server eCommerce is running on port ${PORT}!`);
    });

process.on('SIGINT',() =>{
    console.log('Bye bye!');
    server.close();
    process.exit();
})