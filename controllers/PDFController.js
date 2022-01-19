const express = require("express");
const router = express.Router()
const pdf = require("pdf-creator-node");

router.post("/", async (req, res) => {
    const { order } = req.body;

    let html = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Commercial Invoice</title>
                </head>
                <body>
                <style type="text/css">
                    .tg {
                        border-collapse: collapse;
                        border-spacing: 0;
                    }
                    .tg td {
                        border-color: black;
                        border-style: solid;
                        border-width: 1px;
                        font-family: Arial, sans-serif;
                        font-size:14px;
                        overflow: hidden;
                        padding: 10px 5px;
                        word-break: normal;
                    }
                    .tg th{
                        border-color: black;
                        border-style: solid;
                        border-width: 1px;
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        font-weight: strong;
                        overflow: hidden;
                        padding: 10px 5px;
                        word-break: normal;
                    }
                    .tg .tg-0lax{
                        text-align: left;
                        vertical-align: top;
                    }
                    table {
                        margin: auto;
                        margin-top: 50px;
                        width: 97.5%;
                    }
                    .info {
                        margin-top: 5%;
                        padding: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;  
                    }
                    .billTo {
                        width: 45%;
                        padding: 10px;
                        border: 1px solid black;
                        display: inline-block;
                    }
                    .shipTo {
                        width: 45%;
                        padding: 10px;
                        border: 1px solid black;
                        display: inline-block;
                        float: right;
                    }
                    h1 {
                        width: 20%;
                        align-items: center;
                        margin: auto;
                        margin-top: 50px;
                    }
                    </style>
                    <div class="middle">
                        <h1 class="middle">INVOICE<h1/>
                    </div>
                        <div class="info">
                            <div class="billTo">
                                <h3>Bill to: </h3>
                                <p>${order.billingAddress.name} - ${order.billingAddress.address1}</p>
                                <p>${order.billingAddress.countryCode}-${order.billingAddress.zip} ${order.billingAddress.city}</p>
                            </div>
                        <div class="shipTo">
                            <h3>Ship to: </h3>
                            <p>${order.shippingAddress.name} - ${order.shippingAddress.address1}</p>
                            <p>${order.shippingAddress.countryCode}-${order.shippingAddress.zip} ${order.shippingAddress.city}</p>
                        </div>
                    </div>
                    <table class="tg">
                    <thead>
                      <tr>
                        <th class="tg-0lax">items</th>
                        <th class="tg-0lax">order #</th>
                        <th class="tg-0lax">qty</th>
                        <th class="tg-0lax">price</th>
                      </tr>
                    </thead>
                    <tbody>`
    
    for (let i in order.items) {
        html += `<tr>
                    <td class="tg-0lax"><strong>${order.items[i].product.vendor.name}</strong><br>${order.items[i].product.name}</td>
                    <td class="tg-0lax">${order.items[i].product.sku}</td>
                    <td class="tg-0lax">${order.items[i].quantity}</td>
                    <td class="tg-0lax">${order.items[i].price}</td>
                    </tr>`
    }
    html += `   </tbody>
             </table>
        </body>
    </html>`

    const options = {
        format: "A4",
        orientation: "portrait",
        border: "5mm",
    };
    
    const document = {
        html: html,
        path: "./invoice.pdf",
        type: "",
        data: {}
    };

    pdf.create(document, options).then((status) => {
        res.status(200).send(status);
    }).catch((error) => {
        res.status(501).send(error);
    });
})

module.exports = router