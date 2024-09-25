import { useEffect, useState } from "react";
import defaultProfile from "../../../public/default-profile.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchingHeaderData = async () => {
    if (localStorage.getItem("id")) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_GET_SPECIFIC_USER_URL
          }/${localStorage.getItem("id")}`
        );
        setUserData(response.data);
      } catch (error) {
        if (error.response) {
          setError("an Error occured");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogoutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    fetchingHeaderData();
  }, [localStorage.getItem("id")]);
  return (
    <>
      <div className="profileHeader">
        <div className="data">
          <div className="profile-picture">
            <img src={imageSrc ? imageSrc : defaultProfile} alt="Profile" />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {loading ? (
            <div>loading</div>
          ) : (
            <div className="user-data">
              <div className="user-name">
                {userData?.firstName.charAt(0).toUpperCase() +
                  userData?.firstName.slice(1) +
                  " "}
                {userData?.lastName.charAt(0).toUpperCase() +
                  userData?.lastName.slice(1)}
              </div>
              <div className="user-email">{userData?.email}</div>
              <div className={`error-message ${error ? "show" : ""}`}>
                {error}
              </div>
            </div>
          )}
        </div>
        <button className="header-btn logout" onClick={handleLogoutUser}>
          Log out
        </button>
      </div>
    </>
  );
};

export default ProfileHeader;
