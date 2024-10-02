import axios from 'axios';

export const importLinktreeAccount = async (name:string) => {
  return await axios({
    method: 'get',
    url: '/api/import/linktree?user='+name
  });
};
