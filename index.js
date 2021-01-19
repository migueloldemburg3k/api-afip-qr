// API For QR AFIP
const express = require("express");
const QRcode = require("qrcode")
const imageUri = require("image-data-uri")
const app = express();

app.listen(3000, () => {
	console.log("El servidor está inicializado en el puerto 3000");
});

app.get("/api-qr/:msj?", (req, res) => {
    /*
    It gets parameters: 
       data (json with transaction data)
       url (afip url)
       width (width for QR image)
    */

	//console.log(req.query);
    var options = {
        width: req.query.width
    }

    var database64 = Buffer.from(req.query.data, 'binary').toString('base64')
    var finaldata = req.query.url + database64;

    //console.log(finaldata);

    QRcode.toDataURL(finaldata, options, (err, url) => {
        if (err){
            res.status(500).send("Error generate QR. Exception: "+ err);
        }else{
            
			var img = imageUri.decode(url)
            
            res.set({
                'Content-Type': 'image/png',
                'Content-Length': img.dataBase64.length
            })
            res.status(200).send(img.dataBuffer)
        }
    })

})