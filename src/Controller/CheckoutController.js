import Checkout from '../Model/CheckoutModel.js';

const CheckoutController = {
    postService: async (req, res) => {
        try {
            const { serviceId } = req.params;
            const { user } = req;
            
            let findCheckout = await Checkout.findOne({ user: user._id });
        
            console.log(findCheckout, "the cart with the user id")
        
            const isAdded = findCheckout.checkout
                                    .filter(service => service.service.toString() === serviceId)
                                    .length > 0;
            
        console.log(isAdded, "the item that exists") 
            if (isAdded) {
              return res
                    .status(401)
                    .send("You added this service previously");
            }
            console.log(isAdded)

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

    getServices: async (req, res) => {

    },

    getService: async (req, res) => {
        
    },

    deleteService: async (req, res) => {
        
    }
}

export default CheckoutController;