import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            console.log("Custom Auth decodedData: ", decodedData);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            console.log("Google decodedData: ", decodedData);

            req.userId = decodedData?.sub;
            console.log("req.userId: ",req.userId);
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
