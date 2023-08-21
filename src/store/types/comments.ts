import { EProviders } from './user';

export interface IEventComment {
  id: string;
  comment: string;
  created_at: Date;
  event: string;
  user: {
    display_name: string;
    id: string;
    picture: string;
    provider: EProviders;
  };
}
