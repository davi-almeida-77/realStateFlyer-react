const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Health Check OK');
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
});
