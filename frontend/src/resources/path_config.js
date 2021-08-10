const mainPath = "http://localhost:4000/api";
const userPath = `${mainPath}/user`;
const vehiclePath = `${mainPath}/vehiclelist`;
const messagePath = `${mainPath}/sendmessage`;
const reviewPath = `${mainPath}/review`;
const vehicleReviewPath = `${mainPath}/vehiclereview`;
const rentalPath = `${mainPath}/`;
const deletePath = "/delete";
const updatePath = "/update";
const reviewerPath = "/reviewer";
const revieweePath = "/reviewee";
const authPath = `${mainPath}/authentication`


export default URL = {
    vehicle: vehiclePath,
    user: userPath,
    message: messagePath,
    review: reviewPath,
    vehicleReview: vehicleReviewPath,
    rental: rentalPath,
    register: `${authPath}/register`,
    login: `${authPath}/login`,
    reviewer: reviewerPath,
    reviewee: revieweePath,
    delete: deletePath,
    update: updatePath
}