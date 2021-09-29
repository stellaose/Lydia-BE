import Forms from '../Model/FormModel.js';

const FormController = {
    signup: async (req, res) => {
        try {
                let newForm = req.body;

                if (newForm.price && isNaN(newForm.price)) {
                return res
                    .status(400)
                    .send({ message: "price must be a number" });
                }

                const createForm = await Forms.create(newForm);
                if (createForm) {
                return res
                    .status(200)
                    .send({createForm, status: 'success' })
                    .end();
                } 
                else {
                return res
                    .status(400)
                    .send({ message: `Could not create form` })
                    .end();
                }
                
            } catch (err) {
               console.log(err);
            }
        }
}

export default FormController;