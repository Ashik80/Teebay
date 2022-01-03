import React, { useContext, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import './Log.css';
import { useLazyQuery } from '@apollo/client';
import { BOUGHT_PRODUCTS } from '../../api/query';
import { getAuth } from '../../auth/auth';
import { ProductStoreContext } from '../../stores/productStore';
import ProductList from './ProductList';
import { observer } from 'mobx-react-lite';

const Log = () => {
  const { setBoughtProducts, boughtProducts } = useContext(ProductStoreContext);
  const [bought_products] = useLazyQuery(BOUGHT_PRODUCTS);

  useEffect(async () => {
    let result = await bought_products({
      variables: { userId: parseInt(getAuth().id) },
    });
    if (result.data) {
      setBoughtProducts(result.data.boughtProducts);
    }
  }, []);

  const panes = [
    {
      menuItem: 'Bought',
      render: () => <ProductList products={boughtProducts} />,
    },
    {
      menuItem: 'Sold',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: 'Borrowed',
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: 'Lent',
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
  ];
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
};

export default observer(Log);
