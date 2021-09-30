import Forms from '../Model/FormModel.js';

const FormController = {
    createForm: async (req, res) => {
        const { name, preference, knowledge, room,  price } = req.body;
        try{
            const newForm = new Forms({ name, preference, knowledge, room,  price });
            const savedForm = await newForm.save();

            if(savedForm){
                return res
                .status(200)
                .json({message: 'Saved successfully'})
            }
        } catch(err) {
            console.log(err);
        }
    }
}

export default FormController;