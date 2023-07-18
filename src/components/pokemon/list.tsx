import { Button, Checkbox, Switch , Image} from "antd";
import React, { useEffect, useState } from 'react';
import { StarOutlined, StarFilled,UserOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';

import Search from 'antd/es/input/Search';

import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { getPokemonImage } from "../../endpoints/pokemon";
import { RootState } from "../../redux/store";
import { pokemon } from "../../types/types";


const ListPokemon: React.FC = () => {
    
   const {posts, loading} = useSelector((state: RootState) => state.data); 
   const [loadin, setIsLoading] = useState(false); 
   const [pokemons, setPokemons] = useState<any>();
   const [firstCopy, setFirstCopy] = useState<any>();
   const [isChecked, setIsChecked] = useState(false);
   
    const getPokemons = () => {  
      fetchImages(posts);        
      setFirstCopy(posts);
            };
    const fetchImages = (url: pokemon) =>{ 
      posts.forEach(async (element:pokemon) => {
       getPokemonImage(element.url).then((res:any)=> 
      {for (var i = 0; i < posts.length; ++i) {
        if (posts[i].url == element.url) {
          posts[i].url = res?.data?.sprites?.back_default;
        }
    }
    setPokemons([...posts]) 
  }
       )
      });
    }
        useEffect(()=>{
            getPokemons();
            
            },[loading]);

        useEffect(()=>{
            setPokemons([...posts]);
        },[loading])



   const changeFavorite = (rec: pokemon) =>{  
      posts.filter(function(x:pokemon) { 
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
            setPokemons([...pokemons.filter(function(x:pokemon) { return x.isfavorite == true}  )])
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
         setPokemons([...pokemons?.filter((x:pokemon) => (x.name.includes(value)))])
   };
   

   const columns =[
      {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a : pokemon, b: pokemon) => a.name.localeCompare(b.name)
        },
        {
          title: 'Image',
          render: (item: pokemon| any) =>{
            return (
                <div className='items-center'>
                  <Image
                            key={item.id}
                            height={50}
                            width={50}
                            alt="Pokemon Image"
                            src={item.url}
                         /> 
                 </div>
            )
        }
        },
        {
          title: 'Favorite',
          render: (item: pokemon) =>{
              return (
                  <div className='items-center'>
                   <Button onClick={()=>changeFavorite(item)}>{item.isfavorite == true ?  <StarFilled style={{color: "#fcc603"}}/>: <StarOutlined/>}</Button>
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