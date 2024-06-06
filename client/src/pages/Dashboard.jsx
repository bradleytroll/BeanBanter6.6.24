import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_COFFEE_SHOP } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [addCoffeeShop] = useMutation(ADD_COFFEE_SHOP, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCoffeeShop({
        variables: { name, location, rating: parseInt(rating), review },
      });
      setName('');
      setLocation('');
      setRating('');
      setReview('');
      refetch(); // Refetch the data to update the coffee shops list
    } catch (err) {
      console.error('Error adding coffee shop:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="title">Add a New Coffee Shop</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Location</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Rating</label>
          <div className="control">
            <input
              className="input"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="1"
              max="5"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Review</label>
          <div className="control">
            <textarea
              className="textarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">Add Coffee Shop</button>
          </div>
        </div>
      </form>
      <h2 className="title">My Coffee Shops</h2>
      <div className="columns is-multiline">
        {data.me.coffeeShops.map((shop) => (
          <div className="column is-one-third" key={shop._id}>
            <div className="card">
              <div className="card-content">
                <p className="title is-4">{shop.name}</p>
                <p className="subtitle is-6">Location: {shop.location}</p>
                <p><strong>Rating:</strong> {shop.rating}</p>
                <p><strong>Review:</strong> {shop.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
