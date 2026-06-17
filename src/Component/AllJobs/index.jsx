import './index.css';
import { FaStar, FaBriefcase } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const AllJobs = (props) => {
  const { userDetails } = props;

  return (
    <Link to={`/jobs/${userDetails.id}`}>
      <li style={{ listStyle: 'none' }} className="w-100 p-2 rounded bg-secondary text-white mb-3">
        <div className="rating-cont">
          <img
            src={userDetails.company_logo_url}
            style={{ width: '70px', marginRight: '10px' }}
            alt="Company Logo"
          />
          <div>
            <h3>{userDetails.title}</h3>
            <FaStar />
            <span className="ml-2">{userDetails.rating}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <div>
            <FaLocationDot />
            <span className="ml-2 mr-3">{userDetails.location}</span>
            <FaBriefcase />
            <span className="ml-2">{userDetails.employment_type}</span>
          </div>
          <h4>{userDetails.package_per_annum}</h4>
        </div>

        <hr />
        <h4>Description</h4>
        <p>{userDetails.job_description}</p>
      </li>
    </Link>
  );
};

export default AllJobs;
