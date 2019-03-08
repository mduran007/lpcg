import { Router, Request, Response, NextFunction } from 'express';
const router: Router = Router();


//router.use(function timeLog(req: Request, res: Response, next: NextFunction) {
//    console.log('Time: ', Date.now());
//    next();
//});

router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    console.log(req.session);
    res.render('index', { u: "Usuario" });
});
router.get('/login', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    console.log(req.session);
    res.render('index', { u: "Usuario" });
});

router.post('/authenticate', (req: Request, res: Response) => {
    //https://github.com/jaredhanson/passport-local
    console.log(req.sessionID);
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
