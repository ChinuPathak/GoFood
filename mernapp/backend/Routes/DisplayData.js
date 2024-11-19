const express = require('express')
const router = express.Router()

router.post('/foodData', async (req, resp) => {
    try {
        resp.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.log(error)
        resp.send({ success: false })
    }
})

module.exports = router