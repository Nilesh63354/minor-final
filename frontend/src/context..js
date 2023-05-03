import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import Mapdata from './Mapdata';
const AppContext = React.createContext();

function createItem(singledata) {
    return<Mapdata
    au={singledata.author}
    li={singledata.link}
    na={singledata.name}
    pro={singledata.provider}
    />
}

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [da,setDa]=useState([]);
    const requestData = {
        "keyword": searchTerm,
    }
    
    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response =await axios.post('http://13.233.110.169/scrape', requestData);
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
                    const {key, name, author, link, provider} = bookSingle;
                    return {
                        id: i,
                        author: author,
                        title: name,
                        link: link,
                        provider: provider,
                        
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
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);
  
    return (
        <div>
        <AppContext.Provider value = {{
            loading, books, setSearchTerm, resultTitle, setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
        {/* {da.map(createItem)} */}
        </div>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};