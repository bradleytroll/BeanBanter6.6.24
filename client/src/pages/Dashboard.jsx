import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_COFFEE_SHOP, UPDATE_COFFEE_SHOP, DELETE_COFFEE_SHOP } from '../utils/mutations';
import CoffeeShopForm from '../components/CoffeeShopForm';

const Dashboard = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [addCoffeeShop] = useMutation(ADD_COFFEE_SHOP);
  const [updateCoffeeShop] = useMutation(UPDATE_COFFEE_SHOP);
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEE_SHOP);

  const [editingShop, setEditingShop] = useState(null);

  const handleAddCoffeeShop = async (formData) => {
    try {
      await addCoffeeShop({
        variables: { ...formData },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCoffeeShop = async (formData) => {
    try {
      await updateCoffeeShop({
        variables: { id: editingShop._id, ...formData },
        refetchQueries: [{ query: QUERY_ME }],
      });
      setEditingShop(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCoffeeShop = async (id) => {
    try {
      await deleteCoffeeShop({
        variables: { id },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading data</div>
  }

  if (!data || !data.me) {
    return <div>No data found</div>
  }

  return (
    <div className>
      <h1 className="mb-5">BeanBanter Dashboard</h1>
      <CoffeeShopForm
        onSubmit={editingShop ? handleUpdateCoffeeShop : handleAddCoffeeShop}
        initialData={editingShop}
      />
      <div >
        <h1 className="mb-5">Your Coffee Shops</h1>
      <ul className="columns is-multiline">
        {data.me.coffeeShops.map((shop) => (
          <li className="column is-one-third card" key={shop._id}>
            <h2 className="title is-4">{shop.name}</h2>
            <p className="subtitle is-6">{shop.location}</p>
            <p>Rating: {shop.rating}</p>
            <p>{shop.review}</p>
            <button className="button is-success is-small is-rounded is-outlined" onClick={() => setEditingShop(shop)}>Edit</button>
            <button className="button is-warning is-small is-rounded is-outlined" onClick={() => handleDeleteCoffeeShop(shop._id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Dashboard;
