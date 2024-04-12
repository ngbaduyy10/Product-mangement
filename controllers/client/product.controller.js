const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

module.exports.detail = async (req, res) => {
  try {
    find = {
      deleted: false,
      slug: req.params.slug,
    };

    const product = await Product.findOne(find);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", "Vui lòng nhập đúng id sản phẩm");
    res.redirect(`/products`);
  }
};
