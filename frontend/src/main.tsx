import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";

createRoot(document.getElementById("root")!).render(<App />);
tf.setBackend("cpu").then(() => {
  console.log("✅ TensorFlow backend ready");
});