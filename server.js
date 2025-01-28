const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, "build")));

// Обработка всех маршрутов и возврат index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
