import { Router } from 'express';
import TutorialController from '../controllers/tutorial.controller';

class TutorialRoutes {
  router = Router();
  controller = new TutorialController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // create
    this.router.post('/', this.controller.create);

    // read
    this.router.get('/', this.controller.findAll);
    this.router.get('/:id', this.controller.findOne);

    // update
    this.router.get('/:id', this.controller.update);

    // delete
    this.router.delete('/:id', this.controller.delete);
  }
}

export default new TutorialRoutes().router;
