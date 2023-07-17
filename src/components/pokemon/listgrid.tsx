import { Button, Checkbox, Image } from "antd";
import React, { useEffect, useState } from 'react';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Spin, Table } from 'antd';
import logo from '../../assets/pokemon.png'


import Search from 'antd/es/input/Search';

import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from "antd/es/checkbox";


const ListGridPokemon: React.FC = () => {
    
   const {posts, loading} = useSelector((state: any) => state.data); 
   const [loadin, setIsLoading] = useState(false); 
   const [pokemons, setPokemons] = useState<any>();
   const [firstCopy, setFirstCopy] = useState<any>();
   const [isChecked, setIsChecked] = useState(false);
   


    const getPokemons = () => {  
              setFirstCopy(posts);
              setIsLoading(false);
            };
        useEffect(()=>{
            getPokemons();
            },[loadin]);
        useEffect(()=>{
            setPokemons([...posts]);
        },[loading])

   const changeFavorite = (rec: any) =>{  
      posts.filter(function(x:any) { 
          if(x.id == rec.id)
          {
              x.isfavorite = !rec.isfavorite;
          }
          return posts} );
          setPokemons([...posts]);
         
      }
   
      const onChange = (e: CheckboxChangeEvent) => {
        
        if(e.target.checked == true)
        {
        
            setIsChecked(true);
           setPokemons([...pokemons.filter(function(x:any) { return x.isfavorite == true}  )])
        }
        else 
        {
           setPokemons([...posts]);
           setIsChecked(false);
        }
      };
      
       const onSearch = (value: string) => {
         if(value == " " || value == "")
         setPokemons(firstCopy);
         else
         setPokemons([...pokemons?.filter((x:any) => (x.name.includes(value)))])
   };
   

   const Filters: React.FC =()=>{
      return(
          <>
             <Search placeholder="Search Pokemons" onSearch={onSearch} style={{ width: 200 }} />
             <Checkbox checked={isChecked} style={{float: 'right', marginLeft: '10px'}} onChange={onChange} className='items-right'/>
             <label style={{float: 'right'}}>Toggle Favorites</label>
          </>
    )
  }

   return(
    <>
         <Filters/>
                    {loading ? <Spin />:
                         <>
                         <div className="row">
                         {pokemons?.map((item: any) => (
                         <div style={{float: 'left',margin: '10px', alignItems: "start", borderStyle: "solid", borderWidth: "3px",borderRadius: "30%",padding: "10px", width: "140px"}}>
                         <Image
                            key={item.id}
                            height={50}
                            width={50}
                            src={item.url}
                         /> 
                         <p>{item.name}</p>
                         <hr/>
                         <Button onClick={()=>changeFavorite(item)}>{item.isfavorite == true ?   <StarFilled style={{color: "#fcc603"}}/>: <StarOutlined/>}</Button>
                         </div>))}
                         </div>
                         </>} 
    </>
   )
}
export default ListGridPokemon;