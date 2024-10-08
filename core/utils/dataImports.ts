import axios from 'axios';

export const importLinktreeAccount = async (name:string) => {
  return await axios({
    method: 'get',
    url: '/api/import/linktree?user='+name
  });
};


export const importPSNAccount = async (name:string) => {
  return await axios({
    method: 'get',
    url: '/api/import/psnprofiles?user='+name
  });
};
