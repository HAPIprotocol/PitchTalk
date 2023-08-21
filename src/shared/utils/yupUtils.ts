import { t } from 'i18next';
import * as YUP from 'yup';

declare module 'yup' {
  interface StringSchema {
    startWithHTTP(error?: string): StringSchema;
  }
}

YUP.addMethod(YUP.string, 'startWithHTTP', function (errorMessage) {
  return this.test(
    'test-startWithHTTP',
    errorMessage,
    function (url: string | undefined) {
      return url && !url?.startsWith('http://') && !url?.startsWith('https://')
        ? this.createError({
            message: errorMessage || t('participantForm.validation.httpError'),
          })
        : this.schema;
    }
  );
});

export default YUP;
