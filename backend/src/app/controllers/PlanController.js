import * as Yup from 'yup';

import Plan from '../models/Plan';
import Registration from '../models/Registration';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }
    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      res.status(400).json({ error: 'Student already exists' });
    }
    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const plan = await Plan.findOne({ where: { id: req.params._id } });

    const { title, duration, price } = await plan.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const regExists = await Registration.findOne({
      where: {
        plan_id: req.params.id,
      },
    });

    if (regExists) {
      return res.status(400).json({ error: 'Plan cant be deleted' });
    }
    await plan.destroy();

    return res.json({ message: `${plan.title} deleted!` });
  }
}

export default new PlanController();
