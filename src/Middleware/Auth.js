import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Auth = async (req, res, next) => {
  try{
    const authorize = req.headers('Authorization');
    if(!authorize){
                return res
                    .status(401)
                    .json({
                    status: 'false',
                    message: 'unauthorized'
                   });
        }
        let bearerToken = authorize.split(' ')[1];

    await jwt.verify(bearerToken, process.env.SECRET, (err, decode) => {
        if(err)
            return res
              .status(401)
              .json({
                status: 'fail',
                message: 'Failed to authenticate token'
            });
            req.user = decode;
            next();
    })
    }catch(err){
        console.log(err)
        return res
              .status(401)
              .json({
                       status: 'fail',
                       message: 'unauthorized'
                  })
    }
}

// const Auth = (req, res, next) => {
//   if (req) {
//     const authorization = req.header('Authorization');
//     if (!authorization) {
//       return res
//         .status(401)
//         .json({ status: 'failed', msg: 'unauthorized' })
//         .end();
//     }
//     const token = authorization.replace('Bearer ', '');
//     try {
//         const data = jwt.verify(token, process.env.SECRET);
        
//       if (data) {
//         req.user = data;
        
//         next();
//       } else {
//         return res
//           .status(401)
//           .json({ status: 'failed', msg: 'Token is incorrect' })
//           .end();
//       }
//     } catch (err) {
//         console.log(err.message, "find the token error")
//       return res
//         .status(401)
//         .json({ status: 'failed', msg: 'Token has expired' })
//         .end();
//     }
//   }
// };

export default Auth;