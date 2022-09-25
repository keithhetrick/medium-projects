require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
  },
});

app.use(express.json()), express.urlencoded({ extended: true });
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on PORT ${PORT}`)
);
