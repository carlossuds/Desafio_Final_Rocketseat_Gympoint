import * as Yup from 'yup';
import { differenceInDays } from 'date-fns';

import Checkin from '../models/Checkin';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json('Validation failed');
    }

    const { student_id } = req.params;

    const weekCheckins = [];

    const allCheckins = await Checkin.findAll({
      where: { student_id },
    });

    allCheckins.map(checkin =>
      differenceInDays(new Date(), checkin.createdAt) <= 7
        ? weekCheckins.push(checkin)
        : null
    );

    if (weekCheckins.length >= 5) {
      return res
        .status(401)
        .json('Você atingiu o limite de checkins da semana');
    }

    const createdCheckin = await Checkin.create({ student_id });

    return res.json(createdCheckin);
  }

  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.student_id },
      order: [['id', 'DESC']],
    });

    res.json(checkins);
  }
}

export default new RegistrationController();
