import Services from '../Model/ServiceModel.js';

const ServiceController = {
    getServices : async (req, res) => {
        try {
          let services = await Services
                                .find()
                                .exec();
          return res
                    .status(200)
                    .json({ services })
                    .end();
        } 
        catch (err) {
          console.log(err)
          return res
                .status(400)
                .send({ message: `Invalid request` })
                .end();
        }
      },

      updateService : async (req, res, next) => {
        try {
          const { serviceId } = req.params;
          const Service = req.body;
          const update = await Services
                            .findOneAndUpdate({ _id: serviceId }, Service, {new: true });
         
          if (update !== null) {
             return res
                .status(201)
                .json({
                        status: "success", 
                        data: {
                            service: update
                        }})
                .end();
          } 
          else {
             return res
               .status(404)
               .send({ message: 'there is no service available for this id' })
               .end();
          }
        } 
        catch (err) {
          return res
            .status(400)
            .send({ message: `Invalid service id` })
            .end();
        }
    },
        postService : async (req, res) => {
            try {
              let newService = req.body;

              if (newService.price && isNaN(newService.price)) {
               return res
                    .status(400)
                    .send({ message: "price must be a number" });
              }

              const createService = await Services.create(newService);
              if (createService) {
                return res
                    .status(200)
                    .send({createService, status: 'success' })
                    .end();
              } 
              else {
                 return res
                    .status(400)
                    .send({ message: `Could not create service` })
                    .end();
              }
              
            } catch (err) {
              console.log(err);
            }
    },

    getService : async (req, res) => {
        try {
          const { serviceId } = req.params;
      
          const service = await Services
                                        .findById({ _id: serviceId })
                                        .populate()
                                        .lean()
                                        .exec();
        
          if (service !== null) {
              
            return res
                .status(200)
                .json({
                        service
                    })
                .end();
          } 
          else {
           return res
                    .status(404)
                    .send({ message: "Incorrect serviceId" })
                    .end()
          }
         
        } catch (err) {
          return res
            .status(400)
            .send({ message: "invalid serviceId request" })
            .end();
        }
    },

    getServicesByQuery : async (req, res) => {
        try {
          const getMultipleServices = await Services
                                            .find(req.query)
                                            .lean()
                                            .exec();
          
            res.statusCode = 200;
             res.send({
                    data: getMultipleServices,
                    status: 'success',
                });         
        } 
        catch (err) {
          console.log(err);
        }
    },

    deleteServices : async (req, res) => {
        try {
          const { serviceId } = req.params;
          const { name } = req.body;
         const deleteService = await Services
                                    .findByIdAndDelete(serviceId)
                                    .exec();
      
          if (deleteService !== null) {
            
            return res
                .status(200)
                .send({
                        status: 'successfully deleted service ' + name,
                        message: `Deleted Service with the title ${name}`,
                    });
          } 
            else {
            return res
                .status(404)
                .send({ message: 'Incorrect serviceId' })
                .end();
            }
        } 
        catch (err) {
          return res
            .status(400)
            .send({ message: "invalid serviceId request" });
        }
      }
};

export default ServiceController;