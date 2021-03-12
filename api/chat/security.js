exports.getUserSecurity = (req, res, next) => {
  return res.status(200).send({
    clientFirstName: req.session.user.firstName,
    clientLastName: req.session.user.lastName,
    clientEmail: req.session.user.email,
  });
};
