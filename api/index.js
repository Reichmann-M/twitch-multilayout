const express = require('express');
const app = express();
const port = 9999;
const cors = require('cors');

// Use the cors middleware
app.use(cors());

// Require the endpoint files
const oGeneralCategoryRouter = require('./category/');
const oSpecificCategoryRouter = require('./category/[id]/');
const oCategoryIdLiveChannelsRouter = require('./category/[id]/liveChannels');

// Use the endpoint routers
app.use('/api/category/', oGeneralCategoryRouter);
app.use('/api/category/:id', oSpecificCategoryRouter);
app.use('/api/category/:id/liveChannels', oCategoryIdLiveChannelsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});