type CompassFormState = {
  agentNames?: string,
  normalizedFilters?: {
    meow?: string
  }
  complexNames?: {
    name?: string
  }[]
}

type Cons<H, T> = T extends readonly any[] ?
  ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

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
    : [];

type CompassFormPaths = {
  [key: string]: Paths<CompassFormState, 3>; // << I set the max depth to 3, the author defaulted to 10 which is pretty deep
}

export const CompassQueryKeys: CompassFormPaths = {
  AGENT_NAME: ['agentNames'],
  BUILDING_ADDRESSES: ['normalizedFilters', 'meow'], // << Throws a type error
  SOME_NAME: ['complexNames', 0, 'name'],
}

console.log(CompassQueryKeys)

