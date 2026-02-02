import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from client build
const clientDist = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDist));

// Create HTTP server
const httpServer = createServer(app);

// Register API routes
registerRoutes(httpServer, app).then(() => {
  // Catch-all route for SPA (serves index.html for all non-API routes)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });

  // Start server
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
