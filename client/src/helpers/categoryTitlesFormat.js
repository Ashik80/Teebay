export default function formatCategoryTitles(categories) {
  let catTitles = '';
  categories.map((item, index) => {
    catTitles = catTitles.concat(item.category.title);
    if (index < categories.length - 1) catTitles = catTitles.concat(', ');
  });
  return catTitles;
}
