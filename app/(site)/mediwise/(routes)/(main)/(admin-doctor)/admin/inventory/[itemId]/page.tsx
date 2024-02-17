import React from "react";

const ItemPage = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-[#17A2B8] mb-10">Manage item</h1>
      <section className="flex flex-col gap-y-5 items-start">
        <span>
          <label htmlFor="" className="font-semibold text-[#17A2B8]">
            Item Name
          </label>
          <p> {"amoxicilin"}</p>
        </span>

        <span>
          <label htmlFor="" className="font-semibold text-[#17A2B8]">
            Description
          </label>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            tenetur nemo accusantium atque voluptate, necessitatibus eaque
            aperiam, id corrupti et unde odio debitis quidem fugiat sit optio
            dolores neque natus amet maxime labore eius quaerat sequi? Dolores
            odio veritatis, molestias qui voluptatem deserunt quia numquam, quo
            vero nisi consectetur nesciunt!
          </p>
        </span>

        <span className="flex flex-col">
          <label htmlFor="" className="font-semibold text-[#17A2B8]">
            Dosage
          </label>
          <p>{"500mg"}</p>
        </span>
      </section>
    </div>
  );
};

export default ItemPage;
