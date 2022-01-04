import Forms from '../Model/FormModel.js';
import ErrorResponse from '../Utils/ErrorResponse.js';

const FormController = {
    createForm: async (req, res) => {
        const { name, preference, knowledge, room, date, price } = req.body;
        try{
            if(!name || !preference || !knowledge || !room || !date || !price){
                return res
                .status(400)
                .json({message: 'Please fill all fields'})
            }
            const newForm = new Forms({ name, preference, knowledge, room, date, price });
            const savedForm = await newForm.save();

            if(savedForm){
                return res
                .status(200)
                .json({message: 'Saved successfully'})
            }
        } catch(err) {
            console.log(err);
        }
    }, 
    getOneForm: async (req, res, next) => {
        try{
            const { formId } = req.params

            const getForm = await Forms
                                .findById({ _id: formId })
                                // .populate()
                                // .lean()
                                .exec();

            if(getForm !== null){
                return res
                        .status(200)
                        .json({
                        data: {
                            getForm,
                        },
                            })
                        .end();
            }else {
                return next
                (new ErrorResponse("Invalid formId", 404))
            }
        }catch (err){
            console.log(err)
            return next
            (new ErrorResponse("Server error", 500))
        }
    },

    getForms: async (req, res) => {
        try {
            let form = await Forms.find().exec();
            return res
                .status(200)
                .json({ form })
                .end();
          } 
          catch (err) {
            console.log(err);
            return res
                .status(400)
                .send({ message: `Invalid request` })
                .end();
          }
    }
}

export default FormController;