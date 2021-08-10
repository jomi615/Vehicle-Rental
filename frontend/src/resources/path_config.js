const mainPath = "https://localhost:8000/api";
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


export default URL = {
    vehicle: vehiclePath,
    user: userPath,
    message: messagePath,
    review: reviewPath,
    vehicleReview: vehicleReviewPath,
    rental: rentalPath,
    register: `${mainPath}/authentication/register`,
    login: `${mainPath}/authentication/login`,
    reviewer: reviewerPath,
    reviewee: revieweePath,
    delete: deletePath,
    update: updatePath
}