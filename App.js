import logo from './logo.svg';
import React, {useEffect } from 'react';
import axios from "axios";
import {topnews,evernews,singlenews} from './Redux/News'
import './App.css';
import Navbar from './Navbar';
import { useDispatch,useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const {news,tops,single}=useSelector(state=>state.newsreader.value)
  console.log("single", single);
  const dispatch=useDispatch()
  useEffect(()=>{
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=958cddfca5964808a17673c98e7c5d72`).then(response=>{
     console.log("response=>",response.data.articles);
     dispatch(topnews(response.data.articles))
    })
  },[])


  useEffect(()=>{
    axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=958cddfca5964808a17673c98e7c5d72`).then(response=>{
     console.log("response=>",response.data.articles);
     const details= response.data.articles
     console.log("slices",details.slice(6,100))
     dispatch(evernews(details.slice(6,100)))
    })
  },[])
 
  return (
    <div className="App">
      <Navbar/>
     
<div className='newsimg1'>
<div className='jh'> 
<img className='newsimg' src='https://wallpapers.com/images/hd/crumpled-newspaper-grk1dnw716vpzgsn.jpg' alt=''></img>
</div>
</div>
  <div>
  <div className='ghf'>
  <marquee>
        <h1 className='top'><b>TOP HEADLINES</b></h1>
        </marquee>
<div className="container23">
      {news.map((head)=>(
        <div className="cardt">
          <div className="boxj">
            <div className="content34">
              <div className='cards12'>
              <p className='card1h'><b>Author:</b> {head.author}</p>
              <p className='card2n'><b>Title:</b> {head.title}</p>
              <p className='card3kl'><b>Published At:</b> {head.publishedAt}</p>
</div>
              {/* <a href="#">Read More</a> */}
            </div>
          </div>
        </div>
      ))}
        </div>
      </div>
 
      <div className='mk'>
        <br/>
      <h1 className='top1'><b>TOP NEWS</b></h1>
      <div className='row'>
      {tops.map((lates)=>(
        <div className="cardswed">
          <div className="thumbnail"><img className="left" src={lates.urlToImage} /></div>
          <div className="right">
        <div className="separator" />
        <div className='bv'>
            <p className='nmb'><span className='sd'><b>Title:</b></span><b> {lates.title} </b> </p>
            <p className='nmb'><span className='sd'><b>Content:</b></span><b> {lates.content}</b>  </p>
            <p className='nmb'><span className='sd'><b>Description:</b></span><b> {lates.description} </b> </p>
</div>
          </div>
          <button class="cvb" onClick={()=>{handleOpen();dispatch(singlenews(lates))}}>View</button>
         
        </div>
         ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className='row' style={{overflow:"scroll",height:"80vh"}}>
       <div className='slide112'>
      <div className='scroll'>
       <div className='slidescroll12'>
        <img className='slideser' src={single?.urlToImage} alt=''/>
        <div className='dsdrs7'>
        <p className='tittle45'><span className='color'>Title:</span> {single?.title}</p>
      <p className='tittlee22'><span className='color'>Content</span> {single?.content}</p>
      <p className='tittlee35'><span className='color'>Description:</span> {single?.description}</p>
    </div>
  </div>
</div>
  
   </div>
  
    </div>
   
          </Typography>
        </Box>
      </Modal>
      </div>
      </div>
    </div>
  );
}


