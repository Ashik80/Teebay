import React, { useEffect, useReducer, useState } from 'react';
import './ProductCard.css';
import { Icon } from 'semantic-ui-react';
import CustomModal from '../modal/CustomModal';
import modalReducer from '../../helpers/modalReducer';
import formatDate from '../../helpers/dateFormat';
import { Link } from 'react-router-dom';
import formatCategoryTitles from '../../helpers/categoryTitlesFormat';
import { getAuth } from '../../auth/auth';

const ProductCard = ({ product }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const [categories, setCategories] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (product) {
      let catTitles = formatCategoryTitles(product.productCategories);
      setCategories(catTitles);
      let date = formatDate(product.createdAt);
      setDate(date);
    }
  }, []);

  if (!product) return 'No product';

  return (
    <Link to={`/product-details/${product.id}`} className="card-link">
      <div className="product-card">
        {getAuth().id === product.userId && (
          <Icon
            name="trash"
            className="delete-button"
            size="big"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: 'open', size: 'tiny' });
            }}
          />
        )}
        <div className="product-tile">
          <h2>{product.title}</h2>
        </div>
        <div className="product-category">Categories: {categories}</div>
        <div className="product-price">
          Price: ${product.price} | Rent: ${product.rent_price}{' '}
          {product.rent_option}
        </div>
        <div className="product-description">{product.description}</div>
        <div className="product-date">Date posted: {date}</div>
        <CustomModal size={size} open={open} dispatch={dispatch}>
          <h2>Are you sure you want to delete this product?</h2>
        </CustomModal>
      </div>
    </Link>
  );
};

export default ProductCard;
