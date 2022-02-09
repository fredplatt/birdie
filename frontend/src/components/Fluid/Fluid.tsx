import React from "react";

type FluidProps = {
  beverage: string;
  quantity: number;
};

export function Fluid(props: FluidProps) {
  return (
    <div>
      <p>
        Drink - {props.beverage}, {props.quantity}ml.
      </p>
    </div>
  );
}
