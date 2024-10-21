import * as React from 'react';
import renderer from 'react-test-renderer';
import {TabBarIcon} from "@/components/navigation/TabBarIcon";

it(`renders correctly`, () => {
  const tree = renderer.create(<TabBarIcon name={ 'home'} color={'red'} />).toJSON();

  expect(tree).toMatchSnapshot();
});
