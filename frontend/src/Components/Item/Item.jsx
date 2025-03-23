import PropTypes from 'prop-types';
import rocketImg from '../../Assets/rocket-svgrepo-com.svg';

const Item = ({ isProductList }) => {
  return (
    <main className="main-container">
      <h1 className="heading">
        {isProductList ? (
          <>
            Products 
            <img 
              src={rocketImg} 
              alt="Rocket Icon"
              width="34"
              height="34"
              className="title-icon"
            />
          </>
        ) : (
          'Products'
        )}
      </h1>
    </main>
  );
};

Item.propTypes = {
  isProductList: PropTypes.bool.isRequired,
};

export default Item;