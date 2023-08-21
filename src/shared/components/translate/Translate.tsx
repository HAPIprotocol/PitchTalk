import { useTranslation } from 'react-i18next';

import { ITranslationKeys } from 'services/translation';

export const Translate: React.FC<{ value: ITranslationKeys }> = ({ value }) => {
  const [t] = useTranslation();
  return t(value);
};
