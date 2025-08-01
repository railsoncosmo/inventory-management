export interface Hashing {
  hash(value: string): Promise<string>
}