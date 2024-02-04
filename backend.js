const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
let orientationData;

app.use(express.json());
app.use(cors());

// execute on start
app.listen(port, () => {
    console.log("Server is running on port no.: ", port);
});

// API receives data from frontend here
app.post("/testAPI", async (req, res) => {
    orientationData = req.body.orientationData;
    // @Tristan this is your incoming data!
    if (orientationData) {
        // @Tristan YOUR CODE HERE
        // @Tristan YOUR CODE HERE
        // @Tristan YOUR CODE HERE

        console.log("Orientation Data:", orientationData);
        res.json({ message: "Received orientation data successfully" });
    } else {
        res.status(418).json({ error: "Missing orientation data in the request" });
        console.log(req.body);
    }
});

app.post("/getData", async (req, res) => {
    res.json({ orientationData });
});

