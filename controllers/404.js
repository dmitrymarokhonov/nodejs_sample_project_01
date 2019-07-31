module.exports = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      docTitle: "Page not found",
      path: "/404",
      isAuthenticated: req.session.isLoggedIn
    });
};
