import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript backend!" });
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
