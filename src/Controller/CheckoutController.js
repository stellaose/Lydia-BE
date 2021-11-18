import Checkout from '../Model/CheckoutModel.js';

const CheckoutController = {
    postToCheckout: async (req, res) => {
        try {
          const { serviceId } = req.params;
          const { user } = req;
          
          let findCheckout = await Checkout.findOne({ user: user._id });
      
          const isAdded = findCheckout.checkout
                                    .filter(service => service.service.toString() === serviceId)
                                    .length > 0;
          
      console.log(isAdded, "the item that exists") 
          if (isAdded) {
            return res.
                    status(401)
                    .json("Service already exists in cart");
          }

            await findCheckout.save();
            return res
                    .status(200)
                    .json({
                         message: "success", 
                         data: findCheckout
                        })
                    .end();
         
          
        } catch (err) {
          console.log(err);
          return res
                .status(400)
                .json({ 
                        message: `Invalid request hmm` 
                    })
                .end();
        }
    },

    getCheckoutService: async (req, res) => {
        try {
          
          const findCheckoutItems = await Checkout
                                            .find()
                                            .populate('checkout.dish');
          console.log(findCheckoutItems)
          return res
                .status(200)
                .json({ 
                    message: 'success', 
                    data: findCheckoutItems 
                })
                .end();
        } 
        catch (err) {
          return res
                    .status(400)
                    .json({ 
                        message: `Invalid request` 
                    })
                    .end();
        }
    }
}

export default CheckoutController;