import React from "react";
import Burgerbuilder from "./Burgerbuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Burgerbuilder onInitIngredients={() => {}} />);
  });

  it("should render <BuildControls/> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
