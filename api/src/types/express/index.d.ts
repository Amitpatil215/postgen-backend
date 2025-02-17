// to make file a module and avoid the Typescript error
export {};

declare global {
  namespace Express {
    interface Request {
      cleanBody: any;
      userId?: Number;
    }
  }
}
