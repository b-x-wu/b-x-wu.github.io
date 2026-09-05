const identity = <T>(input: T): T => input;

export const pipe = <T>(...args: ((input: T) => T)[]): ((input: T) => T) => {
  return args.reduce((acc, fn) => {
    return (input) => fn(acc(input));
  }, identity);
};
