import { Button, Checkbox, Switch } from "antd";
import React, { useEffect, useState } from 'react';
import { StarOutlined, StarFilled,UserOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';

import Search from 'antd/es/input/Search';

import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from "antd/es/checkbox";


const ListPokemon: React.FC = () => {
    
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
             console.log(`checked = ${e.target.checked}`);
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
   

   const columns =[
      {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a : any, b: any) => a.name.localeCompare(b.title)
        },
        {
          title: 'Url',
          dataIndex: 'url',
          key: 'url',
        },
        {
          title: 'Favorite',
          render: (item: any) =>{
              return (
                  <div className='items-center'>
                   <Button onClick={()=>changeFavorite(item)}>{item.isfavorite == true ?  <StarFilled/>: <StarOutlined/>}</Button>
                  </div>
              )
          }
        }
      ];

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
                    <Table key="table" dataSource={pokemons}  columns={columns} pagination= {false}/>   }
    </>
   )
}
export default ListPokemon;