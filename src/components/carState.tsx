import { NativeModules } from 'react-native';
import { useState } from 'react';

const { CarState } = NativeModules;

export default function useCarState() {
  const [isCarStopped, setIsCarStopped] = useState(false);

  if (!CarState) {
    CarState.getDrivingState((state: boolean) => {
      setIsCarStopped(state);
    });
  }

  return {
    car: !!CarState,
    isCarStopped,
  };
}
