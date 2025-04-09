import axios from "axios";

export const fetchUserData = async (baseURL, headers) => {
  try {
    const response = await axios.get(`${baseURL}/v1/user`, { headers });
    return response.data.data || {};
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchAddressData = async (baseURL, headers) => {
  try {
    const response = await axios.get(`${baseURL}/v1/address`, { headers });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching address data:", error);
    throw error;
  }
};

export const fetchDropdownOptions = async (baseURL, headers) => {
  try {
    const response = await axios.get(`${baseURL}/v1/dropdown`, { headers });
    return response.data.data || {};
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
    throw error;
  }
};

export const fetchCountries = async (baseURL) => {
  const response = await axios.get(`${baseURL}/v1/locations/countries`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const fetchStates = async (isoCode) => {
  const response = await axios.get(`${baseURL}/v1/locations/states/${isoCode}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const fetchCities = async (countryCode, stateCode) => {
  const response = await axios.get(`${baseURL}/v1/locations/cities/${countryCode}/${stateCode}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch cities for state: ${stateCode}`);
  }

  return response.data; // Expecting an array of cities
};

export const updateUserData = async (baseURL, headers, formData) => {
  try {
    const { address, ...userData } = formData;

    // Update user data
    const userResponse = await axios.put(`${baseURL}/v1/user`, userData, { headers });

    // Update addresses
    const addressPromises = address.map((addr) => {
      if (!addr._id) {
        console.error("Address ID is missing for:", addr);
        throw new Error("Address ID is missing.");
      }

      const { _id, ...addressPayload } = addr; // Remove id for clean payload


      return axios.put(`${baseURL}/v1/address/${_id}`, addressPayload, { headers });
    });

    // Wait for all address updates
    const addressResponses = await Promise.all(addressPromises);

    return {
      userResponse: userResponse.data,
      addressResponses: addressResponses.map((res) => res.data),
    };
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};