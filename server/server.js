const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

// Define a recommendation endpoint 
app.post('/recommendation', (req, res) => {
  const { buildingStart, floor, room, buildingEnd, space, busyness } = req.body;

  const recommendations = giveRecommendation(buildingStart, floor, room, buildingEnd, space, busyness);
  
  res.json({ recommendations });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
