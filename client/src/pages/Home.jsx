import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COFFEESHOPS = gql`
  query GetCoffeeShops {
    coffeeShops {
      _id
      name
      location
      rating
      review
      user {
        username
      }
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_COFFEESHOPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="title has-text-centered">Recent Reviews</h1>
      <div className="columns is-multiline">
        {data.coffeeShops.map((shop) => (
          <div className="column is-one-third" key={shop._id}>
            <div className="card">
              <div className="card-content">
                <p className="title is-4">{shop.name}</p>
                <p className="subtitle is-6">Reviewed by: {shop.user.username}</p>
                <div className="content">
                  <p><strong>Location:</strong> {shop.location}</p>
                  <p><strong>Rating:</strong> {shop.rating}</p>
                  <p><strong>Review:</strong> {shop.review}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;



// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_COFFEE_SHOPS } from '../utils/queries';
// import styled from 'styled-components';


// const Container = styled.div`
//   padding: 2rem;
// `;

// const CoffeeShopList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const CoffeeShopItem = styled.li`
//   background-color: #f4f4f4;
//   margin: 1rem 0;
//   padding: 1rem;
//   border-radius: 8px;
// `;

// const Home = () => {
//   const { loading, error, data } = useQuery(QUERY_COFFEE_SHOPS);

//     // Logging to debug the response
//     console.log('Loading:', loading);
//     console.log('Error:', error);
//     console.log('Data:', data);


//   if (loading) {
//     return <div>loading...</div>;
//   }
//   if (error) {
//     return <div>error loading coffee shops</div>;
//   }

//   console.log(data.coffeeShops, "finding coffee shops");
//   console.log({data});
//   const coffeeShops = data?.coffeeShops || [];

//   return (
//     <Container>
//       <h1>Recently Reviewed Coffee Shops</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <CoffeeShopList>
//           {coffeeShops.map(shop => (
//             <CoffeeShopItem key={shop._id}>
//               <h2>{shop.name}</h2>
//               <p>{shop.location}</p>
//               <p>Rating: {shop.rating}</p>
//               <p>{shop.review}</p>
//             </CoffeeShopItem>
//           ))}
//         </CoffeeShopList>
//       )}
//     </Container>
//   );
// };

// export default Home;














// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_COFFEE_SHOPS } from '../utils/queries';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 2rem;
// `;

// const CoffeeShopList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const CoffeeShopItem = styled.li`
//   background-color: #f4f4f4;
//   margin: 1rem 0;
//   padding: 1rem;
//   border-radius: 8px;
// `;

// const Home = () => {
//   const { loading, data } = useQuery(QUERY_COFFEE_SHOPS);
//   const coffeeShops = data?.coffeeShops || [];

//   console.log("finding coffee shops");

//   return (
//     <Container>
//       <h1>Recently Reviewed Coffee Shops</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <CoffeeShopList>
//           {coffeeShops.map(shop => (
//             <CoffeeShopItem key={shop._id}>
//               <h2>{shop.name}</h2>
//               <p>{shop.location}</p>
//               <p>Rating: {shop.rating}</p>
//               <p>{shop.review}</p>
//             </CoffeeShopItem>
//           ))}
//         </CoffeeShopList>
//       )}
//     </Container>
//   );
// };

// export default Home;
