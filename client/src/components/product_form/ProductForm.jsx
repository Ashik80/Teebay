import React from 'react';
import './ProductForm.css';
import { Form, Button, TextArea, Select } from 'semantic-ui-react';
import ReactSelect from 'react-select';

const cateogryOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const rentOptions = [
  { key: 'd', text: 'per day', value: 'per day' },
  { key: 'm', text: 'per month', value: 'per month' },
  { key: 'y', text: 'per year', value: 'per year' },
];

const ProductForm = () => {
  return (
    <Form>
      <Form.Field>
        <label>Title</label>
        <input placeholder="Title" />
      </Form.Field>
      <div className="product-category-input">
        <label htmlFor="cat-input" style={{ marginBottom: '10px' }}>
          Categories
        </label>
        <ReactSelect isMulti id="cat-input" options={cateogryOptions} />
      </div>
      <Form.Field
        control={TextArea}
        rows={5}
        label="Description"
        placeholder="Tell us more about the product..."
      />
      <Form.Group>
        <Form.Field width={4}>
          <label>Price</label>
          <input type="number" placeholder="Price" />
        </Form.Field>
        <Form.Field width={4}>
          <label>Rent</label>
          <input type="number" placeholder="Rent" />
        </Form.Field>
        <Form.Field
          control={Select}
          options={rentOptions}
          label={{
            children: 'Rent option',
            htmlFor: 'control-rent',
          }}
          placeholder="per day"
          search
          searchInput={{ id: 'control-rent' }}
        />
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
