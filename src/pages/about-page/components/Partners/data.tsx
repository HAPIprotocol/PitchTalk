import BIG_BRAIN_HOLDINGS from 'assets/images/partners/big-brain-holdings.svg';
import GENBLOCK from 'assets/images/partners/genblock-2.svg';
import HUOBI_INC from 'assets/images/partners/huobi-2.svg';
import LINEAR from 'assets/images/partners/linear.svg';
import METAWEB from 'assets/images/partners/metaweb-capital.svg';
import NEAR from 'assets/images/partners/near-white.svg';
import OIN from 'assets/images/partners/oin.svg';
import PANTERA from 'assets/images/partners/pantera-2.svg';
import PROXIMITY from 'assets/images/partners/proximity.svg';

enum EPartners {
  NEAR = 'NEAR',
  GENBLOCK = 'GENBLOCK',
  METAWEB = 'METAWEB',
  PROXIMITY = 'PROXIMITY',
  HUOBI_INC = 'HUOBI_INC',
  OIN = 'OIN',
  PANTERA = 'PANTERA',
  LINEAR = 'LINEAR',
  BIG_BRAIN_HOLDINGS = 'BIG_BRAIN_HOLDINGS',
}

export const PARTNERS = [
  { imgUrl: METAWEB, name: EPartners.METAWEB },
  { imgUrl: NEAR, name: EPartners.NEAR },
  { imgUrl: GENBLOCK, name: EPartners.GENBLOCK },
  { imgUrl: PROXIMITY, name: EPartners.PROXIMITY },
  { imgUrl: HUOBI_INC, name: EPartners.HUOBI_INC },
  { imgUrl: OIN, name: EPartners.OIN },
  { imgUrl: PANTERA, name: EPartners.PANTERA },
  { imgUrl: LINEAR, name: EPartners.LINEAR },
  { imgUrl: BIG_BRAIN_HOLDINGS, name: EPartners.BIG_BRAIN_HOLDINGS },
];
