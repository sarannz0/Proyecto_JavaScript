export const parseEvent = (f) => ({
  id: f.id,
  title: f.title,
  price: f.price,
  description: f.description,
  category: f.category,
  image: f.image,
  rating: {
    rate: f.rating.rate,
    count: f.rating.count,
  },
});


