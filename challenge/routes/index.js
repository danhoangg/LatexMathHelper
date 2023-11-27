const express = require('express');
const router = express.Router();
const path = require('path');
const Generate = require('../helpers/generate');

router.get('/', (req, res) => {
    return res.sendFile(path.resolve('views/index.html'));
});

router.post('/api/generate', async function(req, res) {
    const latex = req.body.latex;
    var outputPath = await Generate.generate(latex);
    if (outputPath === null) {
        return res.status(500).send('Internal Server Error');
    }
    res.sendFile(path.resolve(outputPath));
});

module.exports = router;