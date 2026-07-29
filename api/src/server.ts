import { app } from './app';
import { env } from './config/environment';

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});
