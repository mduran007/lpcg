import { ExpressWebApp } from './server/server'

const port: number = Number(process.env.PORT) || Number(3000);

ExpressWebApp.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});



