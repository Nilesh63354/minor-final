import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import Mapdata from '../../Mapdata'
import "./About.css";
import aboutImg from "../../images/about-img.jpg";
import Loading from "../../components/Loader/Loader"
import BookPredict from './BookPredict';
import { idd } from '../../components/authentication/Login';

const About = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [da,setDa]=useState([]);
  const requestData = {
      "user": idd,
  }

  const fetchBooks = useCallback(async() => {
    setLoading(true);
    try{
        const response =await axios.post('http://52.66.245.138/predict', requestData);
        // console.log(response);
        var sata =  response.data;
        setDa(response.data);
        console.log("updating the data")
        console.log(response.data);
        const docs = sata;
        
        console.log(docs);
        if(docs){
            var i = 0;
            const newBooks = docs.slice(0, 20).map((bookSingle) => {
                const {key, name, author, url,rating} = bookSingle;
                return {
                    id: i,
                    author: author,
                    title: name,
                    url: url,
                    rating: rating,
                    
                }
                i += 1;
            });
            console.log("BOOK LIST :")
            console.log(newBooks);
            setBooks(newBooks);

            if(newBooks.length > 1){
                setResultTitle("Your Search Result");
            } else {
                setResultTitle("No Search Result Found!")
            }
        } else {
            setBooks([]);
            setResultTitle("No Search Result Found!");
        }
    
         setLoading(false);
    } catch(error){
        console.log(error);
        setLoading(false);
    }
}, []);

  useEffect(() => {
    fetchBooks();
  },[]);

  if(loading) return <Loading />;

  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>Recommendation</h2>
        </div>
        <div className='booklist-content grid'>
          {
            books.slice(0, 5).map((item, index) => {
              return (
                <BookPredict key = {index} {...item} />
              )
            })
          }
        </div>

      </div>
    </section>
  )
}

export default About
