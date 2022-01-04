import Services from '../Model/ServiceModel.js';
import ErrorResponse from '../Utils/ErrorResponse.js';
import Reviews from '../Model/ReviewModel.js';

const ServiceController = {
    getServices : async (req, res, next) => {
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
          return next
              (new ErrorResponse("Invalid request", 400))
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
             return next
                (new ErrorResponse("There is no service available for this id", 404))
          }
        } 
        catch (err) {
          return res
            .status(400)
            .send({ message: `Invalid service id` })
            .end();
        }
    },
        postService : async (req, res, next) => {
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
                    .send({createService, 
                            status: 'success' })
                    .end();
              } 
              else {
                 return next
                    (new ErrorResponse("Could not create service", 400))
              }
              
            } catch (err) {
              console.log(err);
            }
    },

    getService : async (req, res, next) => {
        try {
          const { serviceId } = req.params;
      
          const getService = await Services
                                        .findById({ _id: serviceId })
                                        .populate()
                                        .lean()
                                        .exec();
          const getReviews = await Reviews
                                    .find({ serviceId })
                                    .populate()
                                    .exec();
        
          if (getService !== null) {
              
            return res
                    .status(200)
                    .json({
                      data: {
                        getService,
                        reviews: getReviews
                      },
                        })
                    .end();
          } 
          else {
           return next
                (new ErrorResponse("Incorrect serviceId", 404))
          }
         
        } catch (err) {
          console.log(err)
          return next 
              (new ErrorResponse("Invalid serviceId",400))
        }
    },

    getServicesByQuery : async (req, res) => {
        try {
          const getMultipleServices = await Services
                                            .find(req.query)
                                            .lean()
                                            .exec();
          
            res.status(200)
                .json({
                    data: getMultipleServices,
                    getReviews,
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
            return next
                (new ErrorResponse("Invalid serviceId", 400))
            }
        } 
        catch (err) {
          console.log(err);
          return next
              (new ErrorResponse("Invalid serviceId request", 404))
        }
      }
};

export default ServiceController;