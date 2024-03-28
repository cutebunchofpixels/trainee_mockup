import resources from './resources'

export type TranslationKey = keyof (typeof resources)['translation']
