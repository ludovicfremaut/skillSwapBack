declare module "password-validator" {
  class PasswordValidator {
    is(): this;
    min(length: number): this;
    max(length: number): this;
    has(): this;
    uppercase(): this;
    lowercase(): this;
    digits(count?: number): this;
    not(): this;
    spaces(): this;
    oneOf(values: string[]): this;
    validate(password: string, options?: { list?: boolean; details?: boolean }): boolean | string[];
  }

  export default PasswordValidator;
}
