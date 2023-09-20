import { CanDeactivateFn } from '@angular/router';

export interface canexit{
  checkbeforeexit():any;
}

export const canDeactivateGuard: CanDeactivateFn<canexit> = (component:canexit, currentRoute, currentState, nextState) => {
  return component.checkbeforeexit();
};
