import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegister({...userRegister,[name]:value})
    console.log(name,value)
    
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
      const {name,email} =userRegister

      if(name && email){
        axios.post("https://email-sender-v4.herokuapp.com/api/save",userRegister).then(res=>alert(res.data.message))
        setUserRegister({name:"",email:""})
      }else{
        alert("Invalid Input")
      }
  }
  return (
    <header className="container">
      <div className="row">
        <div className="col-12 ">
          
          <div className="Hero">
            <span className="txt "> OUR AIM IS MOTIVATE TO </span>
            <span className="smalltext  ">LEARN PROGRAMMING OR CODING </span>
          </div>
        </div>

        <div className="col-12">
          <div className="Inputs mt-5 ">
            <form action="" onSubmit={handleSubmit}>
              <div className="col-md-3 ">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={userRegister.name}
                  onChange={handleInput}
                  className="mt-4 p-3 ms-5 form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className=" mt-3 ms-5">
                <input
                  type="email"
                  value={userRegister.email}
                  onChange={handleInput}
                  id="email"
                  className="email"
                  name="email"
                  placeholder="Your Email ....."
   
                />

                <input
                  className="btn btn-success"
                  type="submit"
                  value="Subscribe"
                />
              </div>
            </form>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
