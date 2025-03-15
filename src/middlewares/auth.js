const adminAuth = (req, res, next) => {
  const token = "qazz";
  const isAdminAuthenticated = token === "qaz";
  if (!isAdminAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "qaqz";
  const isAdminAuthenticated = token === "qaz";
  if (!isAdminAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};


module.exports ={
    adminAuth,
    userAuth
}
