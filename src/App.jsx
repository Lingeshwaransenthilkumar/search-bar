import { useEffect } from "react";
import { useState } from "react";


function App(){
  const [search,setSearch]=useState("");
  const [searchData,setSearchData] = useState([])
  // for handling keydown events
  const [selectedItem,setSelectedItem]=useState(-1);

  // handle change function
  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  const handleClose = ()=>{
    setSearch("")
    setSearchData([]);
  }

  const handleKeyDown=(e)=>{
    console.log(e.key)
    if(e.key==="ArrowUp" && selectedItem > 0){
      setSelectedItem(prev => prev - 1)
    }
    else if (e.key==="ArrowDown" && selectedItem < searchData.length-1){
      setSelectedItem(prev => prev + 1)
    }
    else if (e.key==="Enter" && selectedItem>=0){
      window.open(searchData[selectedItem].show.url);
    }

  }

  useEffect(()=>{
    if(search!==""){
      fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
      .then((res)=>res.json())
      .then((data)=>setSearchData(data))
    }
  },[search])


  return(
    <>
      <div className="search-bar-container">
        <input type="text" placeholder="What you are looking for ?" value={search} onChange={handleChange} onKeyDown={handleKeyDown} />
        {search === "" ? (
          <ion-icon name="search-outline"></ion-icon>
        ):(
          <ion-icon name="close-circle-outline" onClick={handleClose}></ion-icon>
          )}
        
      </div>
      <div className="search-result">
        {
          searchData.map((data,index)=>(
          <a href={data.show.url} className="suggestion line" key={index} target="_blank">
            {data.show.name}
          </a>
            
          ))
        }
        
      </div>
    </>
  )
}

export default App;