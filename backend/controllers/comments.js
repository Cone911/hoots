const Hoot = require('../models/hoot.js');

module.exports = {
  create,
}

async function create (req, res) {
  console.log("Message: ", req.body);
    try {
    const hoot = await Hoot.findById(req.params.hootId).populate('author');
    req.body.author = req.user._id
    hoot.comments.push(req.body);
    await hoot.save();
    res.status(200).json(hoot);
  } catch (error) {
    res.status(500).json(error);
  }
}