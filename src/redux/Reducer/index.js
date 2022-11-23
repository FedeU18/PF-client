const initialState={
    profesores:[],
   
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
     
      case 'GET_PROFESORES':
        return{
            ...state,
           
        }
        default:
            return {
              ...state
            };
        }
}
        
      export default rootReducer;