import { Router, Request, Response, NextFunction } from 'express';
const router: Router = Router();

import { Usuario } from '../../model/Usuario'

let sessions = {};

let showSessionFiels = function (req: Request, res: Response) {

    console.log("req.authInfo")
    console.log(req.authInfo)

    console.log("req.accepted")
    console.log(req.accepted)

    console.log("req.accepts")
    console.log(req.accepts)

    console.log("req.acceptsCharsets")
    console.log(req.acceptsCharsets)

    console.log("req.acceptsEncodings")
    console.log(req.acceptsEncodings)

    console.log("req.acceptsLanguages")
    console.log(req.acceptsLanguages)

    console.log("req.addListener")
    console.log(req.addListener)

    console.log("req.app")
    console.log(req.app)

    console.log("req.authInfo")
    console.log(req.authInfo)

    console.log("req.baseUrl")
    console.log(req.baseUrl)

    console.log("req.eventNames")
    console.log(req.eventNames)

    console.log("req.get")
    console.log(req.get)

    console.log("req.header")
    console.log(req.header)

    console.log("req.headers")
    console.log(req.headers)

    console.log("req.isAuthenticated")
    console.log(req.isAuthenticated)

    console.log("req.isUnauthenticated")
    console.log(req.isUnauthenticated)


    console.log("req.cookies = " + req.cookies);
    console.log(req.cookies)
}

router.use(
    function sessionChecker(req: Request, res: Response, next: NextFunction) {
        console.log("sessionCheckerFn...");

        //showSessionFiels(req, res);

        console.log("req.headers.cookie...")
        if (req.headers.cookie != null) console.log(req.headers.cookie);

        if (req.cookies != null && req.cookies.user_sid != null) {
            console.log("(req.cookies.user_sid != null) req.cookies.user_sid...")
            if (!req!.session!.user == null) {
                console.log("!req!.session!.user) despite cookie user_sid, there are no user in the session");
            }
            return;
        }
        //cookie is still saved in the browser but session have no user
        next();
    });



router.use(function timeLog(req: Request, res: Response, next: NextFunction) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    console.log("Path /")

    if (req!.session!.user != null) {
        res.render('index', { u: req!.session!.user });
    } else {
        res.render('index', { u: "No User..." });
    }

});
router.get('/login', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    console.log("Path /login");

    if (req!.session!.user != null) {
        res.render('index', { u: req!.session!.user });
    } else {
        res.render('index', { u: "No User..." });
    }

});

router.post('/authenticate', (req: Request, res: Response) => {
    //https://github.com/jaredhanson/passport-local
    if (
        req.body.email == "wagnerdocri@gmail.com"
        &&
        req.body.pass == "123456") {

        req!.session!.user = new Usuario('Wagner', 'wagnerdocri@gmail.com', "123456");
        res.render('index', { u: req!.session!.user!.nome });
    } else {
        //clear cookies
        //clear session
        res.render('index', { u: "No User..." });
    }

    //showSessionFiels(req, res);
    //console.log(req.sessionStore)
});


router.get('/paramName1', (req: Request, res: Response) => {
    // Extrai parametro1 do request
    let { paramName1 } = req.params;
    console.log(paramName1);
    console.log(req.params);
    //res.send('Hello, ${paramName1}');
});

// Export the express.Router() instance to be used by server.ts
export const LoginController: Router = router;
