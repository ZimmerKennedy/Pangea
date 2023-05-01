import axios from 'axios';

export const updateTenant = (tenantId, data) => async dispatch => {
    try{
        const response = await axios.put(`api/tenant/${tenantId}`, data);
        dispatch(updateTenantSuccess(response.data));
    } catch (err) {
        dispatch(updateTenantFailure(err.message));
    }
};

export const updateTenantSuccess = (data) => ({
    type: 'UPDATE_TENANT_SUCCESS',
    payload: data
});

export const updateTenantFailure = (error) => ({
    type: 'UPDATE_TENANT_FAILURE',
    payload: error
});



