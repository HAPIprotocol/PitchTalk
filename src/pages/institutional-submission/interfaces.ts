export interface IInstitutionalSubModel {
  name: string;
  logo: string;
  site: string;
  wallet: string;
  participants?: string[];
}

export enum InputFieldsName {
  NAME = 'name',
  LOGO = 'logo',
  SITE = 'site',
  WALLET = 'wallet',
}
