const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://dbTest:Lacdeptrai1232@cluster0.7dix2nw.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa mô hình dữ liệu
const LinkSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

const Link = mongoose.model('Link', LinkSchema);

// Endpoint POST để ghi dữ liệu vào MongoDB
app.post('/api/live_x', (req, res) => {
  const content = req.body.content;

  const newLink = new Link({ content: content });
  newLink.save()
    .then(() => {
      res.status(200).json({ message: 'success' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Lỗi trong quá trình lưu dữ liệu' });
    });
});

app.listen(3000, () => {
  console.log('Server đang lắng nghe trên cổng 3000');
});