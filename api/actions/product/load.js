// ['Sữa', 'Đồ gia dụng', 'Thực phẩm tươi sống', 'Sản phẩm Nhật Bản', 'Sản phẩm Thái Lan', 'Sản phẩm khác'];
const initialProducts = [
  {
    id: 1, 
    name: 'Khẩu trang Pigeon cho bé',
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
    name: 'Green',
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

export function getProducts(req) {
  let products = req.session.products;
  if (!products) {
    products = initialProducts;
    req.session.products = products;
  }
  return products;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      // if (Math.random() < 0.33) {        
      //   reject('Products load fails 33% of the time. You were unlucky.');
      // } else {      
      resolve(getProducts(req));
      // }
    }, 500); // simulate async load
  });
}
