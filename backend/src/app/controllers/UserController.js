import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      oldPassword: Yup.string()
        .required()
        .min(6),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const { oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      res.status(400).json({ error: 'Wrong password' });
    }

    const { password } = await user.update(req.body);

    return res.json({ password });
  }

  async index(req, res) {
    if (!req.query) {
      const users = await User.findAll();
      return res.json(users);
    }
    const users = await User.findAll();

    const selectedUsers = [];

    users.map(u => (u.name.match(req.query.q) ? selectedUsers.push(u) : null));

    return res.json(selectedUsers);
  }
}

export default new UserController();
