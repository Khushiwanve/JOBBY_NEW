import './index.css';
import AllJobs from '../AllJobs';
import FilterJob from '../filterLeft';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Jobs = () => {
  const [allValues, setValues] = useState({
    userList: [],
    empType: [],
    minPackage: '',
    userSearch: '',
    userInput: '',
  });

  const token = Cookies.get('jwtToken');

  useEffect(() => {
    const fetchUserArr = async () => {
      const { userSearch, empType, minPackage } = allValues;

      // Fixed: join empType array properly with comma, no stray hardcoded values
      const employmentTypeParam = empType.join(',');
      const api = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParam}&minimum_package=${minPackage}&search=${userSearch}`;

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();

        if (response.ok === true) {
          setValues({ ...allValues, userList: data.jobs });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserArr();
  }, [allValues.userSearch, allValues.empType]);

  const onSearchUserIn = (e) => {
    if (e.key === 'Enter') {
      setValues({ ...allValues, userSearch: e.target.value });
    }
  };

  const empTypeChange = (value, isChecked) => {
    if (isChecked === true) {
      setValues({ ...allValues, empType: [...allValues.empType, value] });
    } else {
      setValues({
        ...allValues,
        empType: allValues.empType.filter((e) => e !== value),
      });
    }
  };

  return (
    <div className="cont-main">
      <div className="row-cont">
        <div className="col-4 filter-left">
          <FilterJob changeEmpType={empTypeChange} />
        </div>

        <div className="col-8 all-job">
          <input
            onKeyUp={onSearchUserIn}
            type="search"
            className="form-control w-50 text-dark mb-3 ml-3 contserachcolor border-danger"
            placeholder="search jobs..."
          />
          <ul>
            {allValues.userList.map((each) => (
              <AllJobs key={each.id} userDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
