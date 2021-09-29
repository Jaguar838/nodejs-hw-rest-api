const espress = require("express");
const router = express.Router();
const Users = require("../../model")
const { validateUser, validateID, validate?} = require('./validation')

router.get("/:id", async (req, res, next) => {
    try {
        const user = await Users.getContactById(req.param.id)
        if (user) {
            
        }
    }
});

router.post("/", async (req, res, next) => {
    try {
        const user = await Users.addContact(req.body)
        res.status(201)
    }
});

router.delete('/:id', async (req, res, next) => {
    res.json({'template message'})
})

router.patch('/:id/vaccinated', async (req, res, next) => {
    try {
        
    }
})

module.exports = router