import React, {useState, useEffect, useRef} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet';
import { Switch, } from "@material-tailwind/react";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dropdown from '../../components/dropdown/Dropdown';
import {DatePicker, Input} from "antd"
import { SearchOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import {types} from "./../../global/type";
import './landingpage.css'
import dayjs from 'dayjs';
import data from './../../global/people.json'

function Landingpage() {
  var center = {lat: localStorage.getItem('lati1'), lng: localStorage.getItem('long1')};
  const [yPosition, setYPosition] = useState(350);
  const [zoom, setZoom] = useState(13);
  const [modalShow, setModalShow] = useState(false)
  const [dateModalShow, setDateModalShow] = useState(false)
  const [categoryModalShow, setCategoryModalShow] = useState(false)
  const people = data.data
  const ref = useRef(null);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
  const formattedDate = dateValue.format('YYYY-MM-DD'); // Example format
  const [startDivY, setStartDivY] = useState(0)
  const [scrollable, setScrollable] = useState(false)
// check box in mobile modal.
  const [selected, setSelected] = useState(null);
  const categoryTypes = [
    {id: 0,value: 'all', label: 'All'},
    {id: 1,value: 'dev', label: 'Developer'},
    {id: 2,value: 'singer', label: 'Singer'},
    {id: 3,value: 'student', label: 'Student'},
    {id: 4,value: 'artist', label: 'Artist'},
    {id: 5,value: 'officer', label: 'Officer'}
  ]
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('touchstart', onTouchStart, false);
      return () => element.removeEventListener('touchstart', onTouchStart);
    }
  }, [yPosition]);

  const onTouchStart = (event) => {
    // event.preventDefault();
    const startY = event.touches[0].clientY - yPosition;
    const onTouchMove = (event) => {
      event.preventDefault()
      const newY = event.touches[0].clientY - startY;
      if(newY > 115 && newY < screen.height-185) setYPosition(newY);
    };

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
 };
 
  const searchbarHeight = `${yPosition-120}px`

  
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  center = {lat: localStorage.getItem('lati'), lng: localStorage.getItem('long')};
  return(
    <>
      {modalShow && (
        <>
          <div 
            className='absolute left-0 right-0 -bottom-[100px] top-0 md:hidden z-[100] bg-black opacity-65'
            onClick={()=> {
              setModalShow(false)
              setDateModalShow(false)
              setCategoryModalShow(false)
            }}
          >
          </div>   
          <div className={`absolute left-1 right-1 sm:left-20 sm:right-20 z-[101] top-[200px] md:hidden ${dateModalShow? "" : "hidden"}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='bg-white  rounded-xl overflow-hidden'>
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                <div className='w-full pb-4 flex'>
                  <div className='flex mx-auto space-x-3'>
                    <button 
                      className='bg-[#1565C0] py-1 w-[100px] rounded-lg'
                      onClick={()=>{
                        setDateValue(value)
                        setDateModalShow(false)
                        setModalShow(false)
                      }}
                    >
                      <p className='text-white'>
                        Okay
                      </p>
                    </button>
                    <button 
                      className='bg-red-900 py-1 w-[100px] rounded-lg'
                      onClick={()=>{
                        setDateModalShow(false)
                        setModalShow(false)
                      }}
                    >
                      <p className='text-white'>
                        Cancel
                      </p>      
                    </button>
                  </div>
                  <button></button>
                </div>
              </div>
            </LocalizationProvider>
          </div>
          <div className={`absolute left-1 right-1 sm:left-20 sm:right-20 z-[101] top-[200px] md:hidden ${categoryModalShow? "" : "hidden"}`}>
            <div className='bg-white  rounded-xl overflow-hidden'>
              <div className='w-full mt-4'>
                {categoryTypes.map((type, index) => (
                  <div  key={index} className='w-[220px] mx-auto my-3' >
                    <label style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                      <input
                        type="radio"
                        name="category"
                        value={type.value}
                        checked={selected === type.value}
                        onChange={() => {setSelected(type.value); setModalShow(false); setCategoryModalShow(false)}}
                        style={{marginRight: '10px'}} // Add space between radio button and label
                      />
                      <span style={{fontSize: '20px'}}>{type.label}</span> {/* Increase text size */}
                    </label>
                  </div>
                ))}
              </div>
              <div className='w-full pb-4 flex'>
                  <div className='flex mx-auto space-x-3'>
                    <button 
                      className='bg-red-900 py-1 w-[100px] rounded-lg'
                      onClick={()=>{
                        setCategoryModalShow(false)
                        setModalShow(false)
                      }}
                    >
                      <p className='text-white'>
                        Cancel
                      </p>      
                    </button>
                  </div>
                  <button></button>
                </div>
            </div>
          </div>

        </>
      )}
      <div className='w-full absolute left-0 right-0 z-100 z-50'>
        <Header />
      </div>
      <div className = "w-full flex relative  mt-[80px] h-[calc(100%-60px)] lg:space-x-5  px-4 z-0 overflow-hidden" >
        <div  className={`mapContainerDiv w-full overflow-hidden md:h-full rounded-lg top-0 md:top-auto absolute bottom-0 left-0 md:left-auto right-0 md:right-auto md:relative z-10`}>
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            attributionControl={false}
            className='w-full h-full relative -z-10'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>             
          </MapContainer>
          <div 
            ref={ref} 
            id='bar' 
            style={{ top: searchbarHeight}} 
            className='absolute bottom-[20px] md:invisible bg-white left-0 right-0 w-full cursor-move rounded-t-lg border-t-[2px] border-gray-700'
          >
            <div className='w-full h-[2px] visible pt-3 sm:hidden'/>
              <div className='w-full flex'>
              <div className='m-auto w-[32px] pt-1 h-2'>
                <div className='w-full h-[2px] bg-black my-[2px]'/>
                <div className='w-full h-[2px] bg-black my-[2px]'/>
              </div>
            </div>
            <div className="w-full px-3 justify-between visible md:invisible mt-2 space-y-2">  
            <div className='w-full flex'>
              <Input 
                placeholder="Search by Address"
                style={{
                  height: 40,
                  fontSize: 17
                }}
                suffix={<SearchOutlined />}
              />
            </div>
            <div className='w-full flex space-x-2'>
              <div className='w-full flex justify-between cursor-pointer border-[1px] rounded-lg px-2 border-gray-300' onClick={() => {setModalShow(true); setCategoryModalShow(true);}}>
                {selected ? <p className='h-10 text-black pt-2'>{categoryTypes.find(type => type.value === selected).label}</p> : <p className='h-10 text-gray-800 pt-2'>Categories</p>}
                <p className='h-10 text-black pt-3 zmdi zmdi-caret-down'></p>
              </div>
              <div className='w-full flex justify-between cursor-pointer border-[1px] rounded-lg px-2 border-gray-300' onClick={() => {setModalShow(true); setDateModalShow(true);}}>
                <p className='h-10 text-black pt-2'>{formattedDate}</p>
                <p className='h-10 text-black pt-3 zmdi zmdi-calendar-note'></p>
              </div>
              {/* <div className='flex w-full xl:space-x-1 xl:px-2'>
                
                <div className='w-full'>
                  <Dropdown />
                </div>
                <div className='w-full flex'>
                  <DatePicker 
                    size='large'
                    style={{ width: '100%' }}
                  />
                </div>
              </div> */}
            </div>
            {/* <div className='w-full flex'>
              <div className=' flex items-center mx-auto'>
                <div className='pl-2'>
                  <Switch 
                    color='green'
                    defaultChecked
                  />
                </div>
                <p className='text-black text-sm ml-2 text-right pt-[px]'>
                  Save Search
                </p>
              </div>
            </div> */}
          </div>
          </div>
        </div>
        <div className="w-full">
          <div 
            className="w-full px-5 h-0 md:h-auto lg:flex md:visible bg-white z-100 space-y-1"
          >
            <div className='xl:flex w-full'>
              <div className='flex'>
                <Input 
                  placeholder="Search by Address"
                  // onSearch={onSearch}
                  style={{
                    height: 40
                  }}
                  suffix={<SearchOutlined />}
                />  
              </div>
              <div className='flex w-full xl:space-x-1 xl:px-2'>
                <div className='w-full flex'>
                  <DatePicker 
                    size='large'
                    style={{ width: '100%' }}
                  />
                </div>
                <div className='w-full'>
                  <Dropdown />
                </div>
              </div>
            </div>
          </div>
          <div className={`bg-white w-full invisible sm:visible md:h-full rounded-xl sm:static right-0 pl-5 z-20 overflow-y-auto pb-10 md:pr-0`}>
            <div className="w-full">
              {people.map((item, index) => (
                <div key={index} className="shadow-xl p-4 sm:flex sm:h-40 rounded-xl border-[1px] my-2 mr-3">
                  <div className='w-full sm:w-auto justify-center content-center flex sm:static'>
                    <img src={item.img} className="object-cover w-36 rounded-full sm:rounded-xl mb-5 sm:mb-auto sm:mx-auto"/>
                  </div>
                  <div className="px-6 overflow-hidden w-full">
                    <div className="flex w-full">
                      <p className="w-full text-black text-left text-sm md:text-xl">{"$"+item.price+"/month"}</p>
                      <p className="text-right text-black text-sm md:text-xl zmdi zmdi-favorite-outline" />
                    </div>
                    <div className="w-full">
                      <p className="w-full text-black text-left text-xs lg:text-lg">{item.name}</p>
                      <p className="w-full pb-3 text-gray-500 text-sm md:text-md overflow-hidden">{truncateText(item.brief, 100)}</p>
                      <div className="w-full justify-end h-[1px] bg-gray-500 my-1"/>
                      <p className="w-full text-gray-500 text-left text-xs md:text-md">{item.title1+" | "+item.title12+" | "+" 9791 sqft"}</p>            
                    </div>   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div 
          className={`z-50 absolute md:hidden bg-white left-0 right-0 bottom-0 overflow-y-auto px-3 `} 
          style={{ top: `${yPosition}px`, overscrollBehavior: 'contain' }}
          id='topDiv'
        >
          
          <div className="w-full"  id='targetdiv'>
            {people.map((item, index) => (
              <div key={index} className="shadow-xl p-4 sm:flex sm:h-40 rounded-xl border-[1px] my-2 mr-3">
                <div className='w-full sm:w-auto justify-center content-center flex sm:static'>
                  <img src={item.img} className="object-cover w-36 rounded-full sm:rounded-xl mb-5 sm:mb-auto sm:mx-auto"/>
                </div>
                <div className="px-6 overflow-hidden w-full">
                  <div className="flex w-full">
                    <p className="w-full text-black text-left text-sm md:text-xl">{"$"+item.price+"/month"}</p>
                    <p className="text-right text-black text-sm md:text-xl zmdi zmdi-favorite-outline" />
                  </div>
                  <div className="w-full">
                    <p className="w-full text-black text-left text-xs lg:text-lg">{item.name}</p>
                    <p className="w-full pb-3 text-gray-500 text-sm md:text-md overflow-hidden">{truncateText(item.brief, 100)}</p>
                    <div className="w-full justify-end h-[1px] bg-gray-500 my-1"/>
                    <p className="w-full text-gray-500 text-left text-xs md:text-md">{item.title1+" | "+item.title12+" | "+" 9791 sqft"}</p>            
                  </div>   
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Landingpage;