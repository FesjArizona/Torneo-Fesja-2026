import * as express from 'express';

/* export function createApp() {
  const app = express();

  app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express!' });
  });

  return app;
} */

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Express API running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
