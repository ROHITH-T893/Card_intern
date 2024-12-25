
import { useEffect, useState } from "react";
import axios from "axios";
import { Rate } from "antd";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = async () => {
    try {
      const res = await axios.get("https://api.sampleapis.com/beers/ale");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const get = () => {
    const input = document.getElementById("in");
    if (input.value === "") {
      setIsEmpty(false);
      loaddata()
    } else {
      if (search.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false); 
        setData(search);
      }
    }
  };
  const Clear=()=>{
    const input = document.getElementById("in");
    input.value = "";
    get()
  }
  const Search = () => {
    const input = document.getElementById("in").value.toLowerCase();
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(input)
    );
    get()
    setSearch(filteredData);
    setIsEmpty(filteredData.length === 0);
  };

  return (
    <>
      <nav>
        <div className="search">
          <input type="text" onChange={Search} id="in" />
          <button onClick={Clear}>Clear</button>
        </div>
        <div className="nav">
          <h2>Cards</h2>
          <div className="nav-de">
            <a href="mailto:">Contact Me</a>
            <a href="#footer">About</a>
          </div>
        </div>
      </nav>
      <div className="container">
        {!isEmpty ? (
          data.map((item, index) => (
            <div className="card" key={index}>
              <img
                src={item.image}
                alt={item.name}
              />
              <div className="detail">
                <h3>{item.name}</h3>
                <p>Price: {item.price}</p>
              </div>
              <hr />
              <div className='rating'>
            <span className='starts'>
              <Rate defaultValue={item.rating.average} allowHalf disabled/></span>
                 <span>({item.rating.reviews})</span>
               </div>
            </div>
          ))
        ) : (
          <div className="not">
            <h3>Data Not Found</h3>
          </div>
        )}
        <section id="footer">
          <p>Developed by </p>
          <a
            href="https://www.linkedin.com/in/rohith-t-4a9b73294/"
            target="_blank"
          >
            Rohith T
          </a>
        </section>
      </div>
    </>
  );
}

export default App;
