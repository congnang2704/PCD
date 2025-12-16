import featuredRoutes from './featured.routes.js';

export default (app) => {
  app.use('/api/v1', featuredRoutes);

};
