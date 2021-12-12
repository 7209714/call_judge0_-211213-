var express = require('express');
const request = require('request');
var router = express.Router();


var back_json=""
router.use( function (req,res, next) {
    
    var data=req.body.data
    var cin=req.body.cin
    
    const buff = Buffer.from(data, 'utf-8');
    const buff_cin = Buffer.from(cin, 'utf-8');
    // encode buffer as Base64
    const base64data = buff.toString('base64');
    const base64data_cin = buff_cin.toString('base64');
    //console.log(base64data);
    //console.log(base64data_cin);


    

    const options = {
        method: 'POST',
        url: 'http://192.168.43.133:2358/submissions/batch',
        qs: {base64_encoded: 'true'},
        headers: {
          'content-type': 'application/json',
        //  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        //  'x-rapidapi-key': 'c14f7d728bmsh45872963b9f4ce7p16fd97jsn00e4bac8960d',
          'useQueryString': true
        },
        body: {
          submissions: [
            {language_id: 52, source_code: base64data,stdin:base64data_cin},
            {language_id: 46, source_code:'ZWNobyBoZWxsbyBmcm9tIEJhc2gK'},
            
          ]
        },
        json: true
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
          //console.log(body);
          //console.log(body[0].token);
         // console.log(body[1].token);
         // console.log(body[2].token);
          test=body[0].token+","+body[1].token;
          console.log(test);
          
      
          //--------------------------------------------------GET---------------------------//
          const options_g = {
              method: 'GET',
              url: 'http://192.168.43.133:2358/submissions/batch',
              qs: {
                tokens:test,
                base64_encoded: 'false',
                fields: "*",
              },
              headers: {
                'content-type': 'application/json',
               // 'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
               //'x-rapidapi-key': 'c14f7d728bmsh45872963b9f4ce7p16fd97jsn00e4bac8960d',
                'useQueryString': true
              }
            };
            //options_g.qs['tokens']=test;
          request(options_g, function (error,response, body) {
            if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
            }
             // res.setHeader('Content-Type', 'application/json');
             console.log(options_g.qs['tokens']);
             console.log(typeof(options_g.qs['tokens']))
              //console.log(options_g.qs.tokens)
              var body_json=JSON.parse(body);
              console.log(body_json)
              //console.log(typeof(body_json.submissions)) 
              console.log("GET回傳"+body_json["submissions"][0]["stdout"]);
              console.log("GET回傳"+body_json["submissions"][1]["stdout"]);
              
              var get1=body_json["submissions"][0]["status"];
              var get2=body_json["submissions"][1]["status"];
              //res.status(201);
              console.log({GET1回傳:get1,GET2回傳:get2})
            
              var back={GET1回傳:get1,GET2回傳:get2}
              //console.log(response.body)
              console.log(typeof(back)) 
              back_json=back
              
              console.log(back)
              response.statusMessage = 'JSON.stringify(back)';
              response.sendStatus=200
             
              
            
          });
          console.log(back_json)
      });
      //res.json(back_json);
    
 
    next();
});
  
        
module.exports = router;
