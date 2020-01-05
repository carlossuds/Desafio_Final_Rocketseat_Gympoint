import jwt from 'jsonwebtoken';

import User from '../models/User';
import Student from '../models/Student';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    if (!req.body.id) {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Passwords do not match' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }

    const student = await Student.findByPk(req.body.id);
    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }
    const { id, name, email } = student;
    return res.json({
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
