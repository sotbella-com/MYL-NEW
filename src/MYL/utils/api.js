import axios from "axios";
let baseURL = import.meta.env.VITE_APP_BASE_URL;

// export const fetchUserData = async (baseURL, headers) => {
//   try {
//     const response = await axios.get(`${baseURL}/v1/user`, { headers });
//     return response.data.data || {};
//   } catch (error) {
//     throw error;
//   }
// };

export const fetchUserData = async (baseURL, headers) => {
  try {
    // Fetch user data
    const userResponse = await axios.get(`${baseURL}/v1/user`, { headers });
    let userData = userResponse.data.data || {};

    // Fetch job titles to ensure availability
    const jobTitlesResponse = await axios.get(`${baseURL}/job-titles`, { headers });
    const jobTitles = jobTitlesResponse.data.data || [];

    // Ensure job title ID is correctly mapped to name
    if (userData.job_title) {
      const matchedJob = jobTitles.find((job) => job.id === userData.job_title || job._id === userData.job_title);
      if (matchedJob) {
        userData.job_title = matchedJob.name || matchedJob.title; // Use the correct property
      } else {
        console.warn("No matching job title found for ID:", userData.job_title);
      }
    }

    return userData; // ✅ Return modified data with job title name
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
    throw error;
  }
};

export const fetchJobDropdownOptions = async (baseURL, headers) => {
  try {
    const response = await axios.get(`${baseURL}/job-titles`, { headers });
    return response.data.data || {};
  } catch (error) {
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
    } else if (error.request) {
    } else {
    }
    throw error;
  }
};