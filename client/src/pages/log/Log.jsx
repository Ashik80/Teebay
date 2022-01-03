import React, { useContext, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import './Log.css';
import { useLazyQuery } from '@apollo/client';
import {
  BOUGHT_PRODUCTS,
  BORROWED_PRODUCTS,
  SOLD_PRODUCTS,
  LENT_PRODUCTS,
} from '../../api/query';
import { getAuth } from '../../auth/auth';
import { ProductStoreContext } from '../../stores/productStore';
import ProductList from './ProductList';
import { observer } from 'mobx-react-lite';

const Log = () => {
  const {
    setBoughtProducts,
    boughtProducts,
    setSoldProducts,
    soldProducts,
    setBorrowedProducts,
    borrowedProducts,
    setLentProducts,
    lentProducts,
  } = useContext(ProductStoreContext);
  const [bought_products] = useLazyQuery(BOUGHT_PRODUCTS);
  const [sold_products] = useLazyQuery(SOLD_PRODUCTS);
  const [borrowed_products] = useLazyQuery(BORROWED_PRODUCTS);
  const [lent_products] = useLazyQuery(LENT_PRODUCTS);

  useEffect(async () => {
    // Get bought products
    let bought = await bought_products({
      variables: { userId: parseInt(getAuth().id) },
    });
    if (bought.data) {
      setBoughtProducts(bought.data.boughtProducts);
    }
    // Get sold products
    let sold = await sold_products({
      variables: { userId: parseInt(getAuth().id) },
    });
    if (sold.data) {
      setSoldProducts(sold.data.soldProducts);
    }
    // Get borrowed products
    let borrowed = await borrowed_products({
      variables: { userId: parseInt(getAuth().id) },
    });
    if (borrowed.data) {
      setBorrowedProducts(borrowed.data.borrowedProducts);
    }
    // Get lent products
    let lent = await lent_products({
      variables: { userId: parseInt(getAuth().id) },
    });
    if (lent.data) {
      setLentProducts(lent.data.lentProducts);
    }
  }, []);

  const panes = [
    {
      menuItem: 'Bought',
      render: () => <ProductList products={boughtProducts} />,
    },
    {
      menuItem: 'Sold',
      render: () => <ProductList products={soldProducts} />,
    },
    {
      menuItem: 'Borrowed',
      render: () => <ProductList products={borrowedProducts} />,
    },
    {
      menuItem: 'Lent',
      render: () => <ProductList products={lentProducts} />,
    },
  ];
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
};

export default observer(Log);
