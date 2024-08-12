import { useNavigate } from "react-router-dom";

const imgURL =
  "https://www.dpmarketingcommunications.com/wp-content/uploads/2016/11/404-Page-Featured-Image.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="">
      <div>
        <img src={imgURL} alt="Not found Page" className="" />
      </div>
      <button
        onClick={handleNavigate}
        className=""
      >
        Return to Homepage
      </button>
    </div>
  );
}
