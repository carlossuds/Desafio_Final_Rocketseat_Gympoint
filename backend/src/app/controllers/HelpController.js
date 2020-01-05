import * as Yup from 'yup';

import Help from '../models/Help';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

class HelpController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json('Validation failed');
    }

    const help = await Help.create({ ...req.params, ...req.body });

    return res.json(help);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json('Validation failed');
    }

    const help = await Help.findByPk(req.params.id);

    await help.update({
      ...req.body, // answer
      answer_at: new Date(), // answer_at
    });

    const { name, email } = await Student.findByPk(help.student_id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Nova resposta',
      text: `${name}, sua pergunta já foi respondida, confira!`,
    });

    return res.json(help);
  }

  async index(req, res) {
    const helps = await Help.findAll({
      where: { student_id: req.params.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      order: [['id', 'desc']],
    });

    res.json(helps);
  }
}

export default new HelpController();
