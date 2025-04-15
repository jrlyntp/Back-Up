import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { apiPost } from "../utils/apiHelper";

const CreateAccount = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    user_name: "",
    password: "",
    country: "",
    state: "",
    city: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.country) {
      const fetchedStates = State.getStatesOfCountry(formData.country);
      setStates(fetchedStates);
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
      setCities([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state && formData.country) {
      const fetchedCities = City.getCitiesOfState(
        formData.country,
        formData.state
      );
      setCities(fetchedCities);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await apiPost("auth/sign-up", formData);
      if (result.success) {
        alert("Account created successfully!");
        if (onSubmit) onSubmit(formData);
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-green-500 outline-none";

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create Account
          </h2>
    
          {/* right-aligned grid wrapper */}
          <div className="flex justify-end">
            <div className="w-full max-w-[90%] sm:max-w-[80%] grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Username
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              disabled={!formData.country}
              className={inputClass}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-800">
              City
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={!formData.state}
              className={inputClass}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
            </div>
          </div>
    
          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-medium"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
    
};

export default CreateAccount;
