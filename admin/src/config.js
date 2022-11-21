export let API
if(process.env.NODE_ENV==='production'){
    API=process.env.REACT_APP_PRODUCTION_URL;
}else if(process.env.NODE_ENV==='development'){
    API=process.env.REACT_APP_DEVELOPMENT_URL;
}