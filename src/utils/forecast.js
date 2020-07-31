
const request = require('request')

forecast = (latitude,longitude, callback) =>{
   const  url = 'http://api.weatherstack.com/current?access_key=b36da7d848cd78bd97f3e5cb585f7fa3&query='+ longitude + ', ' + latitude + '&units=f'
    request({url, json:true}, (err, {body})=>{
        if(err){
            callback('Unable to connect to location service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, 'Today is ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out and feels like ' + body.current.feelslike + ' degrees.')
                // location:res.body.current.weather_descriptions[0],
                // temp:res.body.current.temperature,
                // feelsLike:res.body.current.feelslike
         
           
          
        }
    })
}
module.exports=forecast