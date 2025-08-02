const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  
  // For now, just check if token exists (Firebase token validation can be added later)
  next();
};

module.exports = adminAuth;