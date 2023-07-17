import { Button, Input, Image,Modal } from "antd";
import React, { useEffect, useState } from 'react';
import { StarOutlined, StarFilled, EditOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';
import { useSelector } from 'react-redux';


const ListFavorites: React.FC = () => {
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
   
   const columns =[
      {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a : any, b: any) => a.name.localeCompare(b.title)
        },
        {
          title: 'Image',
          render: (item: any) =>{
            return (
                <div className='items-center'>
                  <Image
                            key={item.id}
                            height={50}
                            width={50}
                            src={item.url}
                         /> 
                 </div>
            )
        }
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
        },
        {
          title: 'Rename',
          render: (item: any) =>{
              return (
                  <div className='items-center'>
                 <Button onClick={()=>toggleRename(item)}><EditOutlined/> </Button>
                  </div>
              )
          }
        }
      ];

     useEffect(()=>{
      setFavoritePokemons(posts.filter(function(x:any) { return x.isfavorite == true}));
     
     },[loading])
   return(
    <>
      <Modal title="Rename Pokemon" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Input onChange={handleChange} value={renameValue}/>
      </Modal>
     
        {loading ? <Spin />:
        <Table key="table" dataSource={favoritePokemons}  columns={columns} pagination= {false}/>   }
    </>
   )
}
export default ListFavorites;