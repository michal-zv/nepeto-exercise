import { Paper } from "@mui/material";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          margin: 2,
          padding: 3,
          borderRadius: 2,
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: "80vh",
          minWidth: "600",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HomePage />
        <Toaster position="bottom-left" reverseOrder={false} />
      </Paper>
    </div>
  );
}

export default App;
