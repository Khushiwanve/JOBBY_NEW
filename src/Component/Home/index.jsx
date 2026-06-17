


import { Link } from 'react-router-dom';
import './index.css';






const Home = () =>{
    return(
<div className="hero"
style={{
    backgroundImage: "url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
}}
>
        <header className='left-dev' >
                <h1 className='text-5xl font-bold animate-bounce'>Welcome to Job Finder</h1>
                <p>Find your dream job with ease</p>
                
    <p>Use smart filters to find jobs that match your skills and interests.</p>
    <p>Work with trusted employers and grow your career.</p>
                Welcome to<span className="text-blue-600 ml-2">Job Finder</span>




                <Link to="/jobs">
                <button className="explore-btn ml-4 mt-2">Explore Jobs</button> 
                </Link>  
                <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'
            style={{ marginLeft:"10px", marginTop:"20px" ,width:"320px"
            }} />
            </header>
            <div className='r-cont'>







            {/* <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'
            style={{ marginLeft:"70px", marginTop:"70px"
            }} /> 
            <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png '
            style={{ marginRight:"10px", marginTop:"20px", height:"200px"
            }} />  */}


            </div>


        </div>

    );

};

export default Home;