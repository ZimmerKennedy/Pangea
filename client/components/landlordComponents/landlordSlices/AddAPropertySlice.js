import axios from 'axios';

export const getLandlordId = (userId) => async dispatch => {
    try {
      const userResponse = await axios.get(`api/users/${userId}`);
      if (userResponse.data.role !== "landlord") {
        return new Error("The user is not a landlord.");
      }
      const landlordResponse = await axios.get(`api/landlords?userId=${userId}`);
      return landlordResponse.data[0].id;
    } catch (error) {
      return error;
    }
  };

export const createProperty = (propertyId, data) => async dispatch => {
    try {
      const userResponse = await axios.get(`api/users/${data.userId}`);
      if (userResponse.data.role !== "landlord") {
        return dispatch(createPropertyFailure("The user is not a landlord."));
      }
      const landlordResponse = await axios.get(`api/landlords?userId=${data.userId}`);
      const landlordId = landlordResponse.data[0].id;
      const propertyResponse = await axios.put(`api/property/${propertyId}`, {
        ...data,
        landlordId,
      });
      dispatch(createPropertySuccess(propertyResponse.data));
    } catch (error) {
      dispatch(createPropertyFailure(error.message));
    }
  };
export const createPropertySuccess = (data) => ({
  type: 'UPDATE_PROPERTY_SUCCESS',
  payload: data
});

export const createPropertyFailure = (error) => ({
  type: 'UPDATE_PROPERTY_FAILURE',
  payload: error
});