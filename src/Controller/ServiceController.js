import Services from '../Model/ServiceModel.js';
import Reviews from '../Model/ReviewModel.js';

const ServiceController = {
    getServices: async (req, res) => {
        try{
            const services = await Services.find().exec();
            res
            .status(200)
            .json({services})
            .end()
        }
        catch(err){
            console.log(err);
            return res
            .status(400)
            .json({message: 'Invalid request'})
            .end()
        }
    },

    updateServices: async (req, res) => {
        try{
            const { serviceId } = req.params;
            const Service = req.body;

            const update = await Services.findOneAndUpdate({ _id: serviceId }, Service, {
                new: true,
            });

            if (update !== null) {
                res
                .status(201)
                .json({status: "success", data: {service: update}})
                .end();
            } else {
                res
                .status(404)
                .send({ message: 'There is no available service with this id' })
                .end();
               return;
            }
        }
        catch(err){
            console.log(err);
            return res
            .status(400)
            .json({message: 'Invalid service id'})
            .end()
        }
    },
    
    postServices: async (req, res) => {
        try{
            let newService = req.body;
            if(newService.price && isNaN(newService.price)){
                return res
                .status(400)
                .json({message: 'Price must be a number'})
            }
            const createService = await Services.create(newService);

            if(createService){
                return res
                .status(200)
                .json({createService, message: 'Service created successfully'})
                .end()
            } else{
                return res
                .status(400)
                .json({message: 'Sorry, we could not create the service at this time. Please try again later '})
                .end()
            }
        }
        catch(err){
            console.log(err);
        }
    }, 

    getService: async (req, res) => {
        try{
            const { serviceId } = req.params;

            const getOneService = await Services.findById({ serviceId}).exec();
            const getReviews = await Reviews.find({ _id: serviceId }).exec();

            if (getOneService !== null) {  
              return res
              .status(200)
              .json({
                    data: {
                        getOneService,
                        reviews: getReviews
                    },
                    status: 'success'
              })
              .end();
            } 
            else {
              return res
              .status(404)
              .send({ message: "Incorrect serviceId" })
              .end()
            }
        }
        catch(err){
            return res
            .status(400)
            .json({message: 'There is no service available with this id'})
        }
    },

   getServicesByQuery: async(req, res) => {
        try{
            const getMultipleServices = await Services
                                              .find(req.query)
                                              .lean()
                                              .exec();

            res
            .status(200)
            .send({ data: getMultipleServices, status: 'success'});
    } 
        catch (err) {
            console.log(err);
            return res
            .status(400)
            .json({message: 'Failed to obtain services. Please try again'})
        }
    },

    deleteServices: async (req, res) => {
        try{
            const { serviceId } = req.params;
            const { name } = req.body;
            const deleteServices = await Services.deleteOne({serviceId}).exec();

            if (deleteServices) {
                return res
                .status(200)
                .json({ message: `Deleted service with the title ${name}`})
            } 
            else {
                return res
                .status(404)
                .send({ message: 'Incorrect serviceId' })
                .end();
            }
        }
        catch(err){
            console.log(err);
            res
            .status(400)
            .json({ message: 'Invalid serviceId request'})
        }
    }
}

export default ServiceController;