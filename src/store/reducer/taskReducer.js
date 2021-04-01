import {getAll,Create,Update} from '../Action/taskAction';

//redux state
const initialstate={
    Tasks:[],
    status:''
};

const reducer =(state=initialstate,action)=>{
    switch(action.type){
        case getAll:
            return{
                ...state,
                Tasks:action.payload
            };
            case Create:
            return{
                ...state,
                status:action.payload
            };case Update:
            return{
                ...state,
                status:action.payload
            };
             default:
            return state
    }
    
};
export default reducer;