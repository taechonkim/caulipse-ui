import { IconButton } from '@material-ui/core';
import { Study } from '@src/api/types';
import MyStudyCard from '@src/app/shared/components/myStudyCard';
import ModalKeyEnum from '@src/components/common/modal/enum';
import useModal from '@src/hooks/modal/useModal';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import './index.scss';

interface RecruitingStudiesPresenterProps {
	openedRecruitingStudies: Study[];
	closedRecruitingStudies: Study[];
}

const RecruitingStudiesPresenter = ({
	openedRecruitingStudies,
	closedRecruitingStudies,
}: RecruitingStudiesPresenterProps): JSX.Element => {
	const { openModal } = useModal();

	const closeStudy = () => {
		openModal(ModalKeyEnum.StudyCloseModal);
	};

	const onClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		openModal(ModalKeyEnum.UserStudyMoreModal);
	};

	return (
		<div className="recruiting-studies-container">
			<div className="recruiting-studies-title">모집중 ({openedRecruitingStudies?.length})</div>
			{openedRecruitingStudies?.map((item, index, { length }) => {
				return (
					<MyStudyCard
						key={item.id}
						studyId={item.id}
						title={item.title}
						createdAt={item.createdAt}
						views={item.views}
						bookmarks={0}
						className={index === length - 1 ? '' : 'mb16'}
					/>
				);
			})}
			<div className="recruiting-studies-title-blurred">마감된 스터디</div>
			{closedRecruitingStudies?.map((item, index, { length }) => {
				return (
					<MyStudyCard
						key={item.id}
						studyId={item.id}
						title={item.title}
						createdAt={item.createdAt}
						views={item.views}
						bookmarks={0}
						isTitleBlur
						className={index === length - 1 ? '' : 'mb16'}
						rightComponent={
							<IconButton type="button" onClick={onClickMore}>
								<IoEllipsisVertical size={24} color="#b1b1b1" />
							</IconButton>
						}
					/>
				);
			})}
		</div>
	);
};

export default RecruitingStudiesPresenter;
