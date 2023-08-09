var express = require('express');
var axios = require('axios');
var xml2js = require('xml2js');
var cheerio = require('cheerio');
var router = express.Router();

function fetchProductDetails(url) {
  return axios.get(url).then(response => {
    var $ = cheerio.load(response.data);

    // 以下选择器可能需要根据实际网页结构进行调整
    var title = $('#CBD-ProductData > div > h1').text();
    var author = $('#CBD-ProductData > div > div.CBD-ProductDetailAuthor')
      .text()
      .replace('By: ', '');
    var price = $(
      '#primary-action-box > form.thePrimaryAction > div > span.CBD-ProductDetailPriceBox > span.CBD-ProductDetailActionPrice'
    ).text();
    return {
      title: title,
      author: author,
      price: price,
    };
  });
}

router.get('/', function (req, res, next) {
  var sku = req.query.sku;

  if (!sku) {
    return res.status(400).send('SKU is required');
  }

  axios
    .get('https://www.christianbook.com/sitemap4.xml')
    .then(response => {
      xml2js.parseString(response.data, function (err, result) {
        if (err) {
          return res.status(500).send('Error parsing XML');
        }

        // 寻找与SKU匹配的产品
        // 确保XML结构的正确性
        var urls = result?.urlset?.url;
        if (!urls) {
          return res.status(500).send('Invalid XML structure');
        }

        // 遍历URL，寻找与SKU匹配的产品
        for (var url of urls) {
          var loc = url.loc?.[0];
          if (loc && loc.endsWith(sku)) {
            // 找到匹配的产品
            fetchProductDetails(loc)
              .then(details => res.send(details))
              .catch(error =>
                res.status(500).send('Error fetching product details')
              );
            return;
          }
        }

        // 如果未找到匹配的产品，则返回404状态
        res.status(404).send('Product not found');
      });
    })
    .catch(error => {
      res.status(500).send('Error fetching XML');
    });
});

module.exports = router;
