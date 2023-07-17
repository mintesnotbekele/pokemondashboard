import { Button, Checkbox, Image, Input, Modal } from "antd";
import React, { useEffect, useState } from 'react';
import { StarOutlined, StarFilled, EditOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';
import logo from '../../assets/pokemon.png'


import Search from 'antd/es/input/Search';

import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from "antd/es/checkbox";


const FavoriteGridPokemon: React.FC = () => {
    
    const [favoritePokemons, setFavoritePokemons] = useState<any>();
    const {posts, loading} = useSelector((state: any) => state.data); 
    const [renamed, setRenamed] = useState([]);
    const [renameValue, setRenameValue]= useState();
   


    const changeFavorite = (rec: any) =>{  
        posts.filter(function(x:any) { 
            if(x.id == rec.id)
            {
                x.isfavorite = !rec.isfavorite;
            }
            return posts} );
            setFavoritePokemons(posts.filter(function(x:any) { return x.isfavorite == true}));
        }
  
    const renameFavorite = (rec:any)=>{
      
      posts.filter(function(x:any) { 
        if(x.id == rec.id)
        {
            x.name = renameValue;
        }
        return posts} );
        setFavoritePokemons(posts.filter(function(x:any) { return x.isfavorite == true}));
    }
    useEffect(()=>{
        setFavoritePokemons(posts.filter(function(x:any) { return x.isfavorite == true}));
       },[loading])

  const toggleRename=(rec:any)=>
  {
           setIsModalOpen(true);
           setRenamed(rec);
  }
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleChange=(event: any)=>{
        setRenameValue(event.target.value);
  }

  const handleOk = () => {
     renameFavorite(renamed)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  }; 
 

   return(
    <>
      
                    {loading ? <Spin />:
                         <>
                         <div className="row">
                         {favoritePokemons?.map((item: any) => (
                         <div style={{float: 'left',margin: '10px', alignItems: "start", borderStyle: "solid", borderWidth: "3px",borderRadius: "30%",padding: "10px", width: "140px"}}>
                        
                        <Modal title="Rename Pokemon" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input onChange={handleChange} value={renameValue}/>
                        </Modal>
                        <Image
                            key={item.id}
                            height={50}
                            width={50}
                            src={item.url}
                         /> 
                         <p>{item.name}</p>
                         <hr/>
                         <Button onClick={()=>changeFavorite(item)}>{item.isfavorite == true ?  <StarFilled style={{color: "#fcc603"}}/>: <StarOutlined/>}</Button>
                         <Button onClick={()=>toggleRename(item)}><EditOutlined/> </Button>
                         </div>))}
                         </div>
                         </>} 
    </>
   )
}
export default FavoriteGridPokemon;