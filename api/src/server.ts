import { app } from './app';
import { env } from './config/environment';

const port = process.env.PORT || env.PORT;

app.listen(port, '0.0.0.0', () => {
    console.log(`API corriendo en el puerto ${port} (0.0.0.0)`);
});
