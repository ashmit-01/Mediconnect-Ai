import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { signToken } from "../utils/jwt.js";
import { loginSchema, registerSchema } from "../validators/auth.js";

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body);
  const exists = await User.findOne({ email: input.email.toLowerCase() });

  if (exists) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await User.create({
    name: input.name,
    email: input.email,
    passwordHash,
    role: input.role
  });

  const token = signToken({ userId: user.id, role: user.role });
  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body);
  const user = await User.findOne({ email: input.email.toLowerCase() });

  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken({ userId: user.id, role: user.role });
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function me(req: Request, res: Response) {
  const user = await User.findById(req.user!.userId).select("-passwordHash");
  return res.json(user);
}
