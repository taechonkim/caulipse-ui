import API from '@src/api';
import { IResponseGetUser } from '@src/api/response/user';
import { useQuery } from 'react-query';
import QUERY_KEY from '..';

export default () => {
	const fetcher = async (): Promise<IResponseGetUser> => {
		const res = await API.getUser();
		return res.data;
	};
	return useQuery(`${QUERY_KEY.FETCH_USER}`, fetcher, {
		onError: (e) => {
			console.log(e);
		},
	});
};
