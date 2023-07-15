import React from "react";

function Shop(props) {
  const { data } = props;
  const restaurantData = data?.restaurant || {};

  return (
    <div className="shop container cartmobile">
      <div className="shopart1">
        <h2 className="colorblack">{restaurantData.name}</h2>
        <p className="colorclear">{restaurantData.description}</p>
      </div>
      <div className="shopart2">
        <img className="shopimg" src={restaurantData.picture} alt="" />
      </div>
    </div>
  );
}

export default Shop;
