import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// const Auth = (req, res, next) => {
//   if (req) {
//     const authorization = req.header('Authorization');
//     if (!authorization) {
//       return res
//         .status(401)
//         .json({ 
//               status: 'failed', 
//               msg: 'No authorization is set' 
//           })
//         .end();
//     }
//     const token = authorization.replace('Bearer ', '');
//     try {
//         const data = jwt.verify(token, process.env.SECRET);
        
//       if (data && data._id) {
//         req.user = data;
        
//         next();
//       } else {
//         return res
//           .status(401)
//           .json({ status: 'failed', msg: 'Token is incorrect' })
//           .end();
//       }
//     } catch (e) {
//         console.log(e.message, "find the token error")
//       return res
//         .status(401)
//         .json({ status: 'failed', msg: 'Token has expired' })
//         .end();
//     }
//   }
// };

// export default Auth;


const Auth = (req, res, next) => {
  // check for authorization token
  const token = req.headers.authorization;

  if(!token)
      return res.status(401).json({
          status: 'false',
          message: 'failed to authenticate token'
      });
  let bearerToken = token.split(' ')[1];
  console.log(bearerToken, 'thi');

 jwt.verify(bearerToken, process.env.SECRET,(err, decode) => {
      if(err)
          return res.status(401).json({
              status: 'fail',
              message: 'Failed to authenticate token'
          });
          next();
  })
          return res.status(401).json({
              status: 'fail',
              message: 'unauthorized'
          })
}

export default Auth