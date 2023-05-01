import axios from 'axios';

export const updateLandlord = (landlordId, data) => async dispatch => {
    try {
      const response = await axios.put(`api/landlords/${landlordId}`, data);
      dispatch(updateLandlordSuccess(response.data));
    } catch (error) {
      dispatch(updateLandlordFailure(error.message));
    }
  };

  export const updateLandlordSuccess = (data) => ({
    type: 'UPDATE_LANDLORD_SUCCESS',
    payload: data
  });
  
  export const updateLandlordFailure = (error) => ({
    type: 'UPDATE_LANDLORD_FAILURE',
    payload: error
  });