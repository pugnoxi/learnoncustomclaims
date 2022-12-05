import {engine} from 'express-handlebars';
import {FirebaseController} from './firebase-controller';
import {Request, Response} from 'express';


const app = require("express")();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('partials', './views/partials');

const controller = new FirebaseController();
app.get('/users', async (req: Request, res: Response) => {
  const listUsersResponse = await controller.listAllUsers();
  console.log(listUsersResponse.users.map((u: Record<string,any>) => u))
  res.render('users', { users:listUsersResponse.users })
});

app.get('/users/:uid/change-role', async (req: Request, res:Response) => {
  await FirebaseController.changeRole(req.params.uid, req.query.role?.toString());
  res.redirect(`/users`)
})

app.listen(3000, () => console.log("Server auf Port 3000 gestartet!"));
