const { app, mongoose} = require('../server/server');

describe('Tests with database', () => {

  beforeEach(async () => {
    // start database
    const MONGO_URI = 
    'mongodb+srv://jeff-user:OhcSk2i7cb6bNJU7@cluster0.5z6r4sx.mongodb.net/?retryWrites=true&w=majority';
    await mongoose.connect(MONGO_URI);
  });

  afterEach(async () => {
    // disconnect from database 
    await mongoose.disconnect();
  });
});