import React, { useState, useMemo } from 'react';
import './editCategoryModal.scss';
import { Container, Grid } from '@material-ui/core';
import Modal from '@common/modal/Modal';
import Chip from '@common/chip/Chip';
import CloseButton from '@src/components/common/iconButton/CloseButton';
import BackIcon from '@src/components/common/iconButton/BackButton';
import CommonButton from '@common/button/CommonButton';
import { IModalContainerCommonProps } from '@common/modal/types';
import '@common/modal/common.scss';
import categories from '@src/const';
import { CategoryType, MainCategoryType } from '@src/types';
import usePatchStudy from '@src/hooks/remotes/study/usePatchStudy';
import { useAtom } from 'jotai';
import globalState from '@src/state';

const EditCategoryModal = ({ open, onClose }: IModalContainerCommonProps): JSX.Element => {
	const [mainCategory, setMainCategory] = useState<MainCategoryType>();
	const [subCategory, setSubCategory] = useState<CategoryType>();
	const [state] = useAtom(globalState);
	const { modal } = state;

	const [step, setStep] = useState(0);

	const patchStudy = usePatchStudy();

	const onClick = () => {
		patchStudy.mutate({
			id: modal.params,
			data: {
				categoryCode: subCategory?.code,
			},
		});
	};

	const onClickValue = (category: CategoryType | MainCategoryType) => {
		if (step === 0) {
			setMainCategory(category as MainCategoryType);
			setStep((prev) => prev + 1);
		} else {
			setSubCategory(category);
		}
	};

	const CategoryChip = (props: { category: CategoryType | MainCategoryType }) => {
		const { category } = props;
		const handleClick = () => {
			onClickValue(category);
		};
		const selected = useMemo(() => {
			return step === 0 ? mainCategory?.code === category.code : subCategory?.code === category.code;
		}, [step, mainCategory, subCategory]);
		return (
			<Grid key={category.code} item xs={4} className="modal-chip-item">
				<Chip label={category.label} onClick={handleClick} selected={selected} />
			</Grid>
		);
	};

	const Step0Content = () => (
		<Container>
			<Container className="modal-title-container edit-category-modal-title-container">
				<span>카테고리 수정</span>
				<CloseButton onClick={() => onClose(false)} />
			</Container>
			<Grid container spacing={1}>
				{categories.map((category) => {
					return <CategoryChip key={category.code} category={category} />;
				})}
			</Grid>
		</Container>
	);

	const Step1Content = () => (
		<>
			<Container>
				<Container className="modal-title-container">
					<BackIcon onClick={() => setStep(step - 1)} />
					<span>{mainCategory?.label}</span>
					<CloseButton onClick={() => onClose(false)} />
				</Container>
				<Grid container spacing={1}>
					{categories
						.filter((category) => category.code === mainCategory?.code)[0]
						.subCategories.map((category) => {
							return <CategoryChip key={category.label} category={category} />;
						})}
				</Grid>
			</Container>
			<Container>
				<CommonButton title="변경사항 적용" onClick={onClick} disabled={!subCategory} />
			</Container>
		</>
	);

	return (
		<Modal open={open} onClose={onClose} height="40.438rem">
			<Container className="modal-root-container modal-space-between-container">
				{step === 0 ? <Step0Content /> : <Step1Content />}
			</Container>
		</Modal>
	);
};

export default EditCategoryModal;
