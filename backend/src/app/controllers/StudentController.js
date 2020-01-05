import * as Yup from 'yup';

import Student from '../models/Student';
import Registration from '../models/Registration';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      res.status(400).json({ error: 'Student already exists' });
    }
    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }

  async index(req, res) {
    const students = await Student.findAll({
      order: [['id', 'asc']],
    });

    const selectedStudents = [];

    students.map(s =>
      s.name.match(req.query.q) ? selectedStudents.push(s) : null
    );
    return res.json(selectedStudents);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    // eslint-disable-next-line no-underscore-dangle
    const id = req.params._id;

    const student = await Student.findByPk(id);

    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const regExists = await Registration.findOne({
      where: {
        student_id: req.params.id,
      },
    });

    if (regExists) {
      return res.status(400).json({ error: 'Student cant be deleted' });
    }
    await student.destroy();

    return res.json({ message: `${student.name} deleted!` });
  }
}

export default new StudentController();
