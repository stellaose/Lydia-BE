import Forms from '../Model/FormModel.js';

const FormController = {
    createForm: async (req, res) => {
        const { name, preference, knowledge, room, date, price } = req.body;
        try{
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
    getForm: async (req, res) => {
        try {
            let form = await Forms.find().exec();
            res
            .status(200)
            .json({ form })
            .end();
          } catch (err) {
            console.log(err);
            res
            .status(400)
            .send({ message: `Invalid request` })
            .end();
          }
    }
}

export default FormController;