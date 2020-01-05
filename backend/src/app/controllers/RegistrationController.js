import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }
    const regExists = await Registration.findOne({
      where: {
        student_id: req.body.student_id,
        plan_id: req.body.plan_id,
      },
    });

    if (regExists) {
      return res.status(400).json({ error: 'Registration already exists' });
    }

    const { duration, price, title } = await Plan.findByPk(req.body.plan_id);

    const { name, email } = await Student.findByPk(req.body.student_id);

    const regist = await Registration.create({
      ...req.body,
      end_date: addMonths(parseISO(req.body.start_date), duration),
      price: price * duration,
    });

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Bem vindo ao Gympoint!',
      text: `${name}, você está matriculad@ no plano ${title}(${price}$/mês) por ${duration} meses!`,
    });

    return res.json(regist);
  }

  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'duration', 'price', 'title'],
        },
      ],
    });

    res.json(registrations);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      title: Yup.string().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }
    const reg = await Registration.findOne({
      where: { id: req.params._id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'duration', 'price', 'title'],
        },
      ],
    });

    const student = await Student.findOne({
      where: { name: req.body.name },
    });

    if (!student) {
      return res.status(401).json('User does not exist');
    }

    const plan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (!plan) {
      return res.status(401).json('Plan does not exist');
    }

    await reg.update({
      student_id: student.id,
      plan_id: plan.id,
      start_date: req.body.start_date,
      end_date: addMonths(parseISO(req.body.start_date), plan.duration),
      price: plan.price * plan.duration,
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Atualizada!',
      text: `${student.name}, sua matrícula foi alterada. Plano: ${plan.title}(${plan.price}$/mês) Duração:${plan.duration} meses.`,
    });

    return res.json(reg);
  }

  async delete(req, res) {
    const reg = await Registration.findByPk(req.params.id);

    if (!reg) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    if (reg.active) {
      return res
        .status(404)
        .json({ error: 'Registration Active, cant delete' });
    }

    const { name, email } = await Student.findByPk(reg.student_id);

    await reg.destroy();

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matrícula Encerrada!',
      text: `${name}, sua matrícula foi encerrada :( Esperamos seu retorno breve!`,
    });

    return res.json('Matricula encerrada');
  }
}

export default new RegistrationController();
