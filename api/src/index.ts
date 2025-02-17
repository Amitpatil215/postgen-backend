import express, { json } from "express";
import productsRoutes from "./routes/products/index";
import chatThreadsRoutes from "./routes/chatThread/index";
import chatsRoutes from "./routes/chat/index";
import authRoutes from "./routes/auth/index";

const port = process.env.PORT || 9732;

const app = express();

app.use(json());

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/threads", chatThreadsRoutes);
app.use("/chats", chatsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
