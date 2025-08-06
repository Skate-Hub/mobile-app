const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "seusegredo");
    req.userId = decoded.id; // o payload com id, nome, etc.
    next();
  } catch (err) {
    res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};

module.exports = authMiddleware;
