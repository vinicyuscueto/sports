import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import products from "./data/products.json" with { type: "json" };

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);

const prisma = new PrismaClient();

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Usuário já existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.get("/products", (req, res) => {
  try {
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    return res.json(cart || { items: [] });
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const item = await prisma.item.findFirst({
      where: {
        itemId: cart.id,
        productId,
      },
    });

    if (item) {
      await prisma.item.update({
        where: { id: item.id },
        data: { quantity: item.quantity + quantity },
      });
    } else {
      await prisma.item.create({
        data: {
          itemId: cart.id,
          productId,
          quantity,
        },
      });
    }

    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true },
    });

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.post("/cart/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.json({ items: [] });
    }

    const item = await prisma.item.findFirst({
      where: {
        itemId: cart.id,
        productId,
      },
    });

    if (!item) return res.json({ items: [] });

    if (item.quantity <= 1) {
      await prisma.item.delete({
        where: { id: item.id },
      });
    } else {
      await prisma.item.update({
        where: { id: item.id },
        data: { quantity: item.quantity - 1 },
      });
    }

    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true },
    });

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.delete("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.json({ items: [] });
    }

    await prisma.item.deleteMany({
      where: { itemId: cart.id },
    });

    return res.json({ items: [] });
  } catch (err) {
    return res.status(500).json({
      message: "Por favor, tente novamente mais tarde.",
    });
  }
});

app.listen(3000, () => {
  console.log("Status do servidor: ONLINE");
});