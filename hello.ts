type Cons<H, T> = T extends readonly any[] ?
  ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
  : never;

type Prev = [
  never,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  // https://stackoverflow.com/questions/64356569/how-to-understand-0-1-2-0-in-type-definition-in-typescript
  ...0[]
]

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
      [K in keyof T]-?: ([K] | (Paths<T[K], Prev[D]> extends infer P
        ? P extends []
          ? never
          : Cons<K, P>
        : never
        ))
    }[keyof T]
    : [] ;

type FormState = {
  userName?: string,
  filters?: {
    meow?: string
  }
  complexNames?: {
    name?: string
  }[]
}

type FormPaths = {
  [key: string]: Paths<FormState>;
}

export const queryPaths: FormPaths = {
  USER_NAME: ['userName'],
  MEOW: ['filters', 'meow'], // << Throws a type error
  COMPLEX_NAMES: ['complexNames', 0, 'name'],
}

console.log(queryPaths);

