const express = require('express');
const router = require('./routes/entities');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
