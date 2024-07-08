import React , {useEffect, useState} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useParams } from 'react-router-dom'

function  Detail()  {
    const [data, setData] = useState([]);
    const params = useParams() ; 
    const id = parseInt(params.id) ;
    const search = params.search ; 
    const [textEND, settextEND] = useState(false);
    
  
    useEffect(  ()=>{
        const url = `https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=${search}`;
      
          fetch(url)
         .then(res => res.json())
         .then(data => {
            const array = data.results ; 
            const index =  array.findIndex(item => item.id === id ) ; 
            if (index !== -1 ) {
                setData(data.results[index]) ;
            } 
           })
         .catch(err => console.log(err));
    } , [search , id ])

    const limitOverview = (text) => {
        if (text.length <= 150) {
          return text;
        } else {
          return (
            <>
              {textEND === true ? text : `${text.slice(0, 150 )}...`}
              <button className='btn border-0' onClick={() => settextEND(textEND === true ? false : true)}>
                {textEND === true ? 'see less' : 'see more'}
              </button>
            </>
          );
        }
      };
      const StarsCount = (star) => {
        if (star < 4.5) {
            return 1.5;
        } else if (star > 4.5 && star < 6) {
            return 2.5;
        } else if (star > 6 && star < 8) {
            return 3;
        } else if (star > 8 && star < 9) {
            return 4;
        } else if (star > 9 && star <= 9.5) {
            return 4.5;
        } else if (star > 9.8 && star <= 10) {
            return 5;
        } else {
            return 4;
        }
    };
    
    const selectLangue =(ln)=>{
         switch (ln) {
            case 'en':
                return 'English '
            case 'fr' : 
                return 'Frainçais '
            case "ja"  : 
                return 'Japonise '
            case 'ar' : 
                return 'Arabic '
            default:
                return 'English'
                
         }
    }
    
    
  return (
    <div className='p-5 h-25' >  {
          data.length ===0 ? 'loading ...' :
          <div className="card h-100 w-50  mt-2  mx-auto">
                  {data.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
                      className="card-img-top "
                      alt="found"
                    
                    />
                  ) : (
                    <img src="https://imgs.search.brave.com/EUaZRwPjd_qm3jwJFaj1dip5dJTeGuILfZCzBQJCWHU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMud29uZGVyc2hh/cmUuY29tL3JlcGFp/cml0L2F0aWNsZS8y/MDIxLzA3L3Jlc29s/dmUtaW1hZ2VzLW5v/dC1zaG93aW5nLXBy/b2JsZW0tMS5qcGc"
                      className="card-img-top   "
                      alt="not found"
                      
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <ul className="list-group list-group-flush flex-grow-1">
                      <li className="list-group-item">
                        <p className="font-weight-bold fs-1"> {data.original_name}</p>
                      </li>
                      
                      <li  className="list-group-item font-weight-bold fs-3  ">
                        <p><i className="bi bi-star-fill text-warning " ></i> {StarsCount(data.vote_average)}</p>
                        <p> Votes : {parseInt(data.vote_average)} /10</p>
                        <p> First Air Date :  {data.first_air_date} </p>
                      </li>
                      <li className="list-group-item flex-grow-1 ">
                        {limitOverview(data.overview)}
                        
                      </li>

                      <li className="list-group-item fs-3">
                         <p>popularity : {data.popularity}</p>
                      </li>
                      
                      <li className="list-group-item">
                      Original Language : {selectLangue(data.original_language)}
                      </li>
                     
                    </ul>
                  </div>
                </div>
        }</div>
  )
}

export default Detail