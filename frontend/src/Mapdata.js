import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import './Mapdata.css'

function Mapdata(props) {
  return (
    <div >
        <div>
            <Box className='Table' display='flex'>
            <p>{props.au}</p>
            <a type='link' href={props.li}>{props.li}</a>
            <p>{props.na}</p>
            <p>{props.pro}</p>
        </Box> 
        </div>
        <br/>
        
       

    </div>
  )
}

export default Mapdata