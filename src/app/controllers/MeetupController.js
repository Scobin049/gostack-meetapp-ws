import { parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const meetup = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetup);
  }

  async store(req, res) {
    const { title, description, date, location, image_id } = req.body;

    if (isBefore(date, new Date())) {
      return res.status(401).json({ error: "Meetup can't be created in past" });
    }

    const meetup = await Meetup.create({
      title,
      description,
      date,
      location,
      image_id,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const { title, description, date, location, image_id } = req.body;
    const findMeetup = await Meetup.findByPk(req.params.id);

    if (findMeetup.user_id !== req.userId) {
      return res.status(401).json({ error: "Meetup doesn't belong to you" });
    }

    if (isBefore(parseISO(findMeetup.date), new Date())) {
      return res.status(401).json({ error: "Meetup can't be updated" });
    }

    const meetup = await findMeetup.update({
      title,
      description,
      date,
      location,
      image_id,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: "Meetup doesn't belong to you" });
    }

    if (isBefore(parseISO(meetup.date), new Date())) {
      return res.status(401).json({ error: "Meetup can't be canceled" });
    }

    await Meetup.destroy({ where: { id: req.params.id } });

    return res.json();
  }
}

export default new MeetupController();
