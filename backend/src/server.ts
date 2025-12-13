import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript backend!" });
});

app.post("/api/hello", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "POST request received!", data: req.body });
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
