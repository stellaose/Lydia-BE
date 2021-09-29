import Forms from '../Model/FormModel.js';

const FormController = {
    signup: async (req, res) => {
        const { preference, knowledge, room, name, price} = req.body;
        try{
            if(price && isNaN(price)){
                  return res
                    .status(400)
                    .send({ message: "price must be a number" });
            }
        } catch(err) {
            console.log(err);
        }
    }
}

export default FormController;