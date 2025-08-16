const {Router} = require("express")
const {handleRegisterUser, handleLogin} = require("../controllers/userController")

const router = Router();

router.get('/signup', (req, res) => {
    return res.render("signup")
})

router.get('/login', (req, res) => {
    return res.render("login")
})

router.post('/signup', handleRegisterUser);
router.post("/login", handleLogin)

module.exports = router;