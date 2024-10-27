const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Could not connect to MongoDB:', error));


