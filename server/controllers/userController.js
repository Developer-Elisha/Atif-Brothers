const User = require('../models/userModel');

// Delete All Users
const deleteAllUsers = async (req, res) => {
  await User.deleteMany();
  res.status(200).json({ message: 'All users deleted' });
};

module.exports = { deleteAllUsers };
