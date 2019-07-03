import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    console.log(req.body);
    // const { originalname: name, filename: path } = req.body;

    // const file = await File.create({ name, path, user_id: req.userId });

    return res.json();
  }
}

export default new MeetupController();
