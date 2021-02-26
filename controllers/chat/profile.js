module.exports.getProfilePage = (req, res, next) => {
  res.render('chat', {
    page: 'Profile',
  });
};
