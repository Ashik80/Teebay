import React, { useState } from 'react';
import './ProductForm.css';
import { Form, Button, TextArea, Select, Input } from 'semantic-ui-react';
import ReactSelect from 'react-select';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const cateogryOptions = [
  { value: '1', label: 'Electronics' },
  { value: '2', label: 'Furniture' },
  { value: '3', label: 'Home Appliances' },
  { value: '4', label: 'Sporting Goods' },
  { value: '5', label: 'Outdoor' },
  { value: '6', label: 'Toys' },
];

const rentOptions = [
  { key: 'd', text: 'per day', value: 'per day' },
  { key: 'm', text: 'per month', value: 'per month' },
  { key: 'y', text: 'per year', value: 'per year' },
];

const ProductForm = ({ product, onSubmit, setCategories }) => {
  const [defCat, setDefCat] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: product.title,
      price: product.price,
      rent_price: product.rent_price,
      rent_option: product.rent_option,
      description: product.description
    },
  });

  useEffect(() => {
    if (product) {
      reset(product)
      let cats = product.productCategories;
      if (cats) {
        let catIds = cats.map((c) => {
          return { value: c.category.id.toString(), label: c.category.title };
        });
        // let catIds = cats.map((c) => c.category.id.toString());
        setDefCat(catIds);
        console.log(catIds);
      }
    }
  }, [product]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <Form.Field
        className="product-form-input"
        control={Input}
        error={errors.title && errors.title.message}
      >
        <label htmlFor="">Title</label>
        <input
          placeholder="Title"
          // defaultValue={product.title}
          {...register('title', { required: 'Title is required' })}
        />
      </Form.Field>
      <Form.Field>
        <div className="product-category-input">
          <label htmlFor="cat-input" style={{ marginBottom: '10px' }}>
            Categories
          </label>
          <ReactSelect
            isMulti
            id="cat-input"
            onChange={(value) => {
              console.log(value)
              let cats = value.map((v) => parseInt(v.value));
              setCategories(cats);
            }}
            defaultValue={defCat}
            options={cateogryOptions}
          />
        </div>
      </Form.Field>
      <Form.Field
        control={Input}
        className="product-form-input"
        error={errors.description && errors.description.message}
      >
        <label htmlFor="">Description</label>
        <textarea
          placeholder="Tell us more about the product..."
          defaultValue={product.description}
          {...register('description', { required: 'Description is required' })}
        />
      </Form.Field>
      <Form.Group>
        <Form.Field
          className="product-form-input"
          control={Input}
          // width={4}
          error={errors.price && errors.price.message}
        >
          <label>Price</label>
          <input
            type="text"
            placeholder="Price"
            defaultValue={product.price}
            {...register('price', { required: 'Price is required' })}
          />
        </Form.Field>
        <Form.Field
          className="product-form-input"
          control={Input}
          // width={4}
          error={errors.rent_price && errors.rent_price.message}
        >
          <label>Rent</label>
          <input
            type="text"
            placeholder="Rent"
            defaultValue={product.rent_price}
            {...register('rent_price', { required: 'Rent price is required' })}
          />
        </Form.Field>
        <Form.Field
          className="product-form-input"
          width={5}
          error={errors.rent_option && errors.rent_option.message}
        >
          <label htmlFor="">Rent Option</label>
          <select
            defaultValue={product.rent_option}
            {...register('rent_option', {
              required: 'Rent Option is required',
            })}
          >
            {rentOptions.map((option) => (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </Form.Field>
      </Form.Group>
      <div className="form-button">
        <Button color="violet" type="submit">
          Add Product
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;
