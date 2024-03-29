export class ConfigService {
  public static get(key: string) {
    const value = process.env[key]

    if (value === undefined) {
      throw new Error(`Missing ${key} in environment variables`)
    }

    return value
  }
}
