// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';
import { LoginResultData, RankResultData } from './types';
export enum URL {
  logout = '/user/logout',
  heroType = '/btc_nft/v1/pfp/ordz-pfp/traits?format=json',
  login = '/Home/Login/accountLoginReg',
  ordinals = '/Home/Login/ordinalsDataSave',
  rankList = '/Home/Login/rankingList',
}

const logout = async () => post<any>({ url: URL.logout });
const getHeroTypes = async () => get<any>({ url: URL.heroType });
const login = async (data) => post<LoginResultData>({ url: URL.login, data });
const getOrdinalData = async (data) => post<LoginResultData>({ url: URL.ordinals, data });
const getRankList = async (data) => post<RankResultData>({ url: URL.rankList, data });

export { logout, getHeroTypes, login, getOrdinalData, getRankList };
