import React, { useMemo, useState, useRef, useEffect, RefObject } from 'react';
import { MainCategoryType, CategoryType } from '@src/types';
import { Container, Typography, Grid } from '@material-ui/core';
import MainCategoryItem from '@src/app/main/MainCategoryItem';
import categories from '@src/const';
import Loader from '@common/loader/Loader';
import StudyCardContainer from '@src/app/shared/components/card/StudyCardContainer';
import fetchStudies from '@src/hooks/remotes/study/useFetchStudies';
import { Study } from '@api/types';
import { useHistory } from 'react-router-dom';
import { useAtom } from 'jotai';
import { studyListState } from '@src/state';
import useIntersectionObserver from '@src/hooks/common/useIntersectionObserver';
import { orderByMapper } from '@src/app/shared/utils/studyMapper';
import MainButton from '../button/MainButton';
import './index.scss';

const MobileMainPage = (): JSX.Element => {
	const history = useHistory();

	const [state, setState] = useAtom(studyListState);

	const { filterOption, paginationOption } = state;
	const { pageNo } = paginationOption;

	const { data, isLoading } = fetchStudies(Object.keys(orderByMapper)[0], filterOption, paginationOption);

	const totalPage = useMemo(() => {
		return data?.pages ?? 0;
	}, [data]);

	const target = useRef<HTMLDivElement>(null);
	const isOnScreen = useIntersectionObserver(target);

	const [studies, setStudies] = useState([] as Study[]);

	useEffect(() => {
		if (!data?.studies) return;
		if (pageNo === 1) {
			setStudies(data?.studies);
		} else {
			setStudies(studies.concat(data?.studies));
		}
	}, [data]);

	useEffect(() => {
		if (isOnScreen && pageNo && pageNo < totalPage) {
			setState({ ...state, paginationOption: { ...state?.paginationOption, pageNo: pageNo + 1 } });
		}
	}, [isOnScreen]);

	const onClick = (category: MainCategoryType) => {
		if (category.path === '') {
			history.push('/study');
		} else {
			history.push(`/study/${category.path}`);
		}
	};

	const categoryArr = [
		{
			label: '전체',
			path: '',
			code: 0,
			subCategories: [] as CategoryType[],
		},
	].concat(categories);

	return (
		<>
			<Container className="mobile-main-page-main-category-container">
				<Grid container className="mobile-main-page-main-category-grid">
					{categoryArr.map((category) => (
						<MainCategoryItem key={category.code} category={category} onClick={onClick} />
					))}
				</Grid>
			</Container>
			<Container className="mobile-main-page-study-list-container">
				<Typography>곧 마감이 되는 스터디들이에요!</Typography>
				{studies?.map((study) => (
					<StudyCardContainer study={study} key={study.id} />
				))}
				<Container ref={target as unknown as RefObject<HTMLDivElement> | null}>{isLoading && <Loader />}</Container>
			</Container>
			<MainButton />
		</>
	);
};

export default MobileMainPage;
