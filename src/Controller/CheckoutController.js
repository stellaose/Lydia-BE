import Checkout from '../Model/CheckoutModel.js';

const CheckoutController = {
    postService: async (req, res) => {
        try {
            const { serviceId } = req.params;
            const { user } = req;
            
            let findCheckout = await Checkout.findOne({ user: user._id });
        
        
            const isAdded = findCheckout.checkout
                                        .filter(service => service.service.toString() === serviceId)
                                        .length > 0;
            
            if (isAdded) {
              return res
                    .status(401)
                    .send("You added this service previously");
            }

            await findCheckout.save();

            return res
                    .status(200)
                    .send({ 
                        message: "success", 
                        data: findCheckout
                    })
                    .end();
           
            
          } catch (err) {
            console.log(err);
            return res
                .status(400)
                .send({ message: `Invalid request hmm` })
                .end();
          }
    },

    getService: async (req, res) => {
        try {
            const { userId } = req.params;
            const findCheckout = await Checkout
                                    .findOne({ user: userId })
                                    .populate("cart.service")
                                    .exec()
            
            
            return res
                    .status(200)
                    .json(findCheckout.checkout)
                    .end()
            
          } catch (err) {
            console.log(err);
            return res
                    .status(400)
                    .json({ message: `Invalid request` })
                    .end();
          }

    },

    getServices: async (req, res) => {
        try {
    
            const findCheckout = await Checkout
                                            .find()
                                            .populate('cart.dish')
                                            .exec()
            return res
                    .status(200)
                    .json({ 
                        message: 'success', 
                        data: findCheckout 
                    })
                    .end();
          } catch (err) {
            console.log(err);
            return res
                    .status(400)
                    .json({ message: `Invalid request` })
                    .end();
          }
        
    },

    deleteService: async (req, res) => {
        try {
            const { serviceId } = req.params;
            const { user } = req;
      
            let findCheckout = await Checkout.findOne({ user: user._id });
      
            const notExistent =
              findCheckout.checkout.filter((service) => service.service.toString() === serviceId).length === 0;
      
            if (notExistent) {
              return res
                    .status(401)
                    .send('Dish does not exist in cart');
          }
          const indexOfServiceToDelete = await findCheckout.checkout
            .map((service) => {
              return service._id.toString();
            })
            .indexOf(serviceId);

          await findCheckout.checkout.splice(indexOfServiceToDelete, 1);
          await findCheckout.save();

          return res
                .status(200)
                .json({ 
                    data: findCheckout, 
                    message: "Successfully deleted checkout item" 
                });
        } catch (err) {
          return res
                .status(400)
                .json({ message: 'invalid request' });
        }
    }
}

export default CheckoutController;