import {  useRef, useState } from 'react';
import { Link} from 'react-router-dom'
import '../App.css';


function SearchFilms() {
  const SearchREF = useRef('');
  const [data, setData] = useState([]);
  const [pages , setPages]= useState() ; 
  const [textEND, settextEND] = useState(false);
  const [loading , setLoading] = useState('search for a film')
  
  var stl= 'none'

  const handleSearch = async () => {
    setLoading('Loading') ; 
    
 
   stl='block' ; 



    const search = SearchREF.current.value;
    const url = `https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=${search}`;
      
    await fetch(url)
      .then(res => res.json())
      .then(data => {
         setData(data.results) ; 
         setPages(data.total_pages) 
         stl='none' ;
         setLoading('') ;
         
        })
      .catch(err => console.log(err));
  };

  const limitOverview = (text) => {
    if (text.length <= 300) {
      return text;
    } else {
      return (
        <>
          {textEND === true ? text : `${text.slice(0, 300)}...`}
          <button className='btn border-0' onClick={() => settextEND(textEND === true ? false : true)}>
            {textEND === true ? 'see less' : 'see more'}
          </button>
        </>
      );
    }
  };
  const renderPages = (page )=>{
    const PagesNumbers = [] ; 
    for (let index = 1; index <= page; index++) {
      PagesNumbers.push(
      <button className='mx-3  pt-1 rounded-circle btn btn-outline-primary  text-center ' style={{width:35+"px"  , height:35+"px" }}>
             {index}
      </button>
      )
      
    }
    return(PagesNumbers);
  }
  return (
    <>
      
      <form className="form">
        <div className="my-3 d-flex justify-content-center align-items-center">
          <input type="text"  className="form-control w-50 mx-2" ref={SearchREF}  placeholder="Search for your films here"/>
          <button type="button" onClick={handleSearch} className="btn btn-primary mx-2">
            Search
          </button>
        </div>
      </form>  
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 bg-light my-3">
          {
            data.length >0 ? data.map((item, key) => (
              <div className="col" key={key}>
                <div className="card h-100 ">
                  {item.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                      className="card-img-top"
                      alt="found"
                    />
                  ) : (
                    <img src="https://imgs.search.brave.com/EUaZRwPjd_qm3jwJFaj1dip5dJTeGuILfZCzBQJCWHU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMud29uZGVyc2hh/cmUuY29tL3JlcGFp/cml0L2F0aWNsZS8y/MDIxLzA3L3Jlc29s/dmUtaW1hZ2VzLW5v/dC1zaG93aW5nLXBy/b2JsZW0tMS5qcGc"
                      className="card-img-top"
                      alt="not found"
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <ul className="list-group list-group-flush flex-grow-1">
                      <li className="list-group-item">
                        <p className="font-weight-bold">{item.name}</p>
                      </li>
                      <li className="list-group-item flex-grow-1 ">
                        {limitOverview(item.overview)}

                      </li>
                      <li className="list-group-item">
                         <Link to={`/detail/${item.id}/${SearchREF.current.value}`}>View Detail</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )) : <div className=' d-flex my-5 justify-content-center align-items-center mx-auto bg-light w-50 rounded' style={{height: 50 +"px"}}> 
                  {loading} <span style={{display:stl}} className='loading'></span>
            </div>
          }
          
        </div>
       {pages ?
        <div className=' my-3 d-flex justify-content-center align-items-center  '>
           {renderPages(pages)}
       </div>
    
       : ""} 
      </div>

      <style jsx="true">{`
        .card-img-top {
          height: 200px;
          object-fit: cover;
        }
      `}</style>
    
    </>
  );
}

export default SearchFilms;
