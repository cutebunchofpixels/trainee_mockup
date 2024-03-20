import { FirebaseError } from 'firebase/app'
import { TranslationKey } from 'types/TranslationKey'

export function handleFirebaseError(
  error: unknown,
  callback: (message: string) => void,
  getTranslatedMessage: (key: TranslationKey) => string
) {
  if (error instanceof FirebaseError) {
    callback(getTranslatedMessage(`errors.fb.${error.code}` as TranslationKey))
  } else {
    callback(getTranslatedMessage('errors.unexpected'))
  }
}
