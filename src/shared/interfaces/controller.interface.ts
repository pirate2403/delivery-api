import { IControllerMatcher } from "./controller-matcher.interface";

export interface IController {
  matchers: IControllerMatcher[];
}
