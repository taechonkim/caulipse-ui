import React, { useMemo } from 'react';
import { Container, Grid } from '@material-ui/core';
import { IoChevronUp } from 'react-icons/io5';
import categories, { CategoryType } from '@src/const';
import SubCategoryItem from './SubCategoryItem';
import './index.scss';

interface ISubCategoryPresenterProps {
	onChange: (code: CategoryType) => void;
	mainCategory: CategoryType | undefined;
	selectedCategories: CategoryType[];
}

const SubCategoryPresenter = ({
	onChange,
	mainCategory,
	selectedCategories,
}: ISubCategoryPresenterProps): JSX.Element => {
	const selectedCategory = useMemo(() => {
		return categories.filter((category) => {
			return category.code === mainCategory?.code;
		});
	}, [mainCategory]);
	return (
		<Container className="sub-category-presenter-container">
			{!!selectedCategory?.length && (
				<Grid container className="sub-category-presenter-item-container">
					{selectedCategory?.[0]?.subCategories?.map((category) => (
						<SubCategoryItem
							key={category.code}
							category={category}
							onClick={onChange}
							selected={selectedCategories.includes(category)}
						/>
					))}
				</Grid>
			)}
			<Container className="sub-category-presenter-bottom-bar">
				<IoChevronUp />
			</Container>
		</Container>
	);
};

export default SubCategoryPresenter;
