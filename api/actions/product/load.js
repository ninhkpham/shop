// ['Sữa', 'Đồ gia dụng', 'Thực phẩm tươi sống', 'Sản phẩm Nhật Bản', 'Sản phẩm Thái Lan', 'Sản phẩm khác'];
const initialProducts = [
  {
    id: 1,
    name: 'Sữa - Khẩu trang Pigeon cho bé',
    productType: 'Sữa',
    img: 'img1-thumb.jpg',
    price: 7,
    description: `Đặc điểm nổi bật
- Xuất xứ Nhật Bản
- An toàn cho bé
- Thiết kế hình vòm 3 chiều
- Kháng khuẩn, lọc bụi bẩn tối đa
Giá iu cho các cục cưng 120k/ hộp 3 cái
`
  },
  {
    id: 2,
    productType: 'Đồ gia dụng',
    name: 'Sữa rửa mặt Hadalabo - Japan',
    img: 'img2-thumb.jpg',
    price: 1,
    description: `Sữa rửa mặt Hadalabo - Japan

Sữa rửa mặt tạo bọt Hada Labo dạng tạo bọt sẵn tiện lợi cho làn da sạch sâu tận lỗ chân lông cùng khả năng dưỡng ẩm tuyệt vời. Phiên bản mới 2016 chai màu xanh chăm sóc da mụn, da dễ nổi mẩn.

Xuất xứ: Nhật Bản
Hãng sản xuất: Rohto
Quy cách: 160ml
`
  },
  {
    id: 3,
    productType: 'Sữa',
    name: 'Sữa - Green',
    img: 'img1-thumb.jpg',
    price: 8,
    description: 'Ringo'
  },
  {
    id: 4,
    productType: 'Sữa',
    name: 'Blue',
    img: 'img1-thumb.jpg',
    price: 2,
    description: 'Paul'
  }
];

export function getProducts(req, type) {
  let products = req.session.products;
  // if (!products) {
  products = initialProducts;
  console.log('type', JSON.stringify(type));
  if (parseInt(type, 10) === 10) {
    products = products.filter(pr => pr.productType == 'Sữa');
  }
  req.session.products = products;
  // }
  return products;
}

export default function load(req, params) {
  return new Promise((resolve, reject) => {
    //console.log('params', params);
    const type = params[0];
    // make async call to database
    setTimeout(() => {
    //   // if (Math.random() < 0.33) {        
    //   //   reject('Products load fails 33% of the time. You were unlucky.');
    //   // } else {      
      resolve(getProducts(req, type));
    //   // }
    }, 500); // simulate async load


    // // lets require/import the mongodb native drivers.
    // const mongodb = require('mongodb');

    // // load from mlab: mongodb://admin:1234@ds151068.mlab.com:51068/shop
    // const url = process.env.MONGOLAB_URI || 'mongodb://admin:1234@ds151068.mlab.com:51068/shop';

    // //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    // const MongoClient = mongodb.MongoClient;

    // // Connection URL. This is where your mongodb server is running.

    // //(Focus on This Variable)
    // // var url = 'mongodb://localhost:27017/my_database_name';      
    // //(Focus on This Variable)

    // // Use connect method to connect to the Server
    // MongoClient.connect(url, function (err, db) {
    // if (err) {
    //   console.log('Unable to connect to the mongoDB server. Error:', err);
    // } else {
    //   console.log('Connection established to', url);

    //   db.collection('products', (er, collection) => {
    //     // filter collection based on type
    //     resolve(collection);
    //   });
    //   // do some work here with the database.

    //   //Close connection
    //   db.close();
    // }
  });
});
}
