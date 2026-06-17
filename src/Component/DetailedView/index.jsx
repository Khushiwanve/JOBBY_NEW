import { useParams } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const JobDetailedview = () => {
  const { id } = useParams();
  const token = Cookies.get('jwtToken');
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobsDetails = async () => {
      const api = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok) {
          setJobDetails(data.job_details);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobsDetails();
  }, [id]);

  if (!jobDetails) {
    return <p style={{ color: 'white', padding: '20px' }}>Loading...</p>;
  }

  return (
    <div className="detailed-cont" style={{ padding: '20px', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img src={jobDetails.company_logo_url} alt="company logo" style={{ width: '80px' }} />
        <div>
          <h2>{jobDetails.title}</h2>
          <p>⭐ {jobDetails.rating}</p>
        </div>
      </div>
      <p>📍 {jobDetails.location} &nbsp; 💼 {jobDetails.employment_type}</p>
      <p>💰 {jobDetails.package_per_annum}</p>
      <hr />
      <h4>Description</h4>
      <p>{jobDetails.job_description}</p>
      <h4>Skills</h4>
      <ul>
        {jobDetails.skills &&
          jobDetails.skills.map((skill) => (
            <li key={skill.name}>
              <img src={skill.image_url} alt={skill.name} style={{ width: '30px', marginRight: '8px' }} />
              {skill.name}
            </li>
          ))}
      </ul>
      <h4>Life at Company</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <p style={{ flex: 1 }}>{jobDetails.life_at_company?.description}</p>
        <img
          src={jobDetails.life_at_company?.image_url}
          alt="life at company"
          style={{ width: '200px', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default JobDetailedview;
