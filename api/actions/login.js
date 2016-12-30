export default function login(req) {
  const user = {
    name: req.body.name,
    isAdmin: req.body.name === 'admin'
  };
  req.session.user = user;
  return Promise.resolve(user);
}
