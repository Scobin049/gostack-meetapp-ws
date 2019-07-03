import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const meetup = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetup);
  }

  async store(req, res) {
    const { title, description, date, location, image_id } = req.body;

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
}

export default new MeetupController();
