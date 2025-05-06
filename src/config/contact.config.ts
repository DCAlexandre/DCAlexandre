const {
  VITE_MY_EMAIL,
  VITE_MY_PHONE,
  VITE_MY_LOCATION,
  VITE_MY_LINKEDIN,
  VITE_MY_GITHUB,
  VITE_MY_FACEBOOK,
  VITE_MY_MALT,
} = import.meta.env;

// ----------------------------------------------------------------------

const config = {
  email: VITE_MY_EMAIL,
  phone: VITE_MY_PHONE,
  location: VITE_MY_LOCATION,
  linkedIn: VITE_MY_LINKEDIN,
  facebook: VITE_MY_FACEBOOK,
  github: VITE_MY_GITHUB,
  malt: VITE_MY_MALT,
};

// ----------------------------------------------------------------------

export default config;
