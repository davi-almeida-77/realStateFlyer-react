exports.register_user = (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    return res.status(400).json({ message: 'email and password invalid' });
  }

  if ( email && password ) {
    return res.status(200).json({ message: 'Sucessful Login' });
  }
  
};
