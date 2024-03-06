require('dotenv').config()
const express = require('express');
const { getTheImage } = require('./file-storage');

const PORT = process.env.PORT;
const storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
const storageAccountKey = process.env.STORAGE_ACCOUNT_KEY;
console.log(storageAccountName, storageAccountKey);
const app = express();

app.get('/image', async (req, res) => {
    const imagePath = req.query.path;
    const [response, properties] = await getTheImage(storageAccountName, storageAccountKey, imagePath);
    res.writeHead(200, {
        'Content-Length': properties.contentLength,
        'Content-Type': "image/jpeg",
    })
    response.readableStreamBody.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});