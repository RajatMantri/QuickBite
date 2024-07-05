const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.send([global.items, global.category]);
    }
    catch (error) {
        console.log(error.message);
        res.send("Server Error");
    }
})


module.exports = router;