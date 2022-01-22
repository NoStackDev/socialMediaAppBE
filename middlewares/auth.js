export default function auth(req, res, next) {
  if (!req.session) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
}
