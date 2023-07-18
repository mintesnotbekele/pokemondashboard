import axios from "axios";
import * as types from "./actionTypes";
import { getPokemonData ,   } from "../endpoints/pokemon";

const fetchPostStart=()=>({
    type: types.FETCH_POST_START,
});
const fetchPostSuccess=(posts: any)=>({
    type:types.FETCH_POST_SUCCESS,
    payload: posts
})
const fetchPostFail=(error: any)=>({
    type: types.FETCH_POST_FAIL,
    payload: error
});

export function fetchPosts(){
    return function(dispatch: any){
        dispatch(fetchPostStart());
        getPokemonData()
        .then((response : any)=>{
            const posts = response.data.results;
            posts.forEach((value: any, idx: number) => 
            {
             posts[idx].id=idx;
             posts[idx].isfavorite = false
            }
           );
            dispatch(fetchPostSuccess(posts));
        }).catch((error: any) => {
            dispatch(fetchPostFail(error.message))
        })
    }
}