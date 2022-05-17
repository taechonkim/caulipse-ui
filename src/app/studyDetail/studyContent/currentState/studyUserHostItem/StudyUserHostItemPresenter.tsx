import React from 'react';
import { StudyUser, UserProfile } from '@api/types';
import useModal from '@src/hooks/modal/useModal';
import './styles.scss';
import { getProfileImgs } from '@src/app/shared/utils/profileImg';
import defaultImg from '@src/assets/img/profileImg/default.svg';

interface StudyUserHostItemPresenterProps {
	user: UserProfile;
}

const StudyUserHostItemPresenter = ({ user }: StudyUserHostItemPresenterProps): JSX.Element => {
	const { openModal } = useModal();

	const onClick = () => {
		// TODO 필요한 모달 연결
		// openModal(${modalFileName});
	};
	return (
		<div className="study-user-host-item-container">
			{user ? (
				<>
					<img
						className="study-user-host-item-img"
						src={
							getProfileImgs().includes(user.image)
								? require(`@src/assets/img/profileImg/${user.image}`).default
								: defaultImg
						}
						width={40}
						height={40}
						alt=""
					/>
					<div className="study-user-host-item-column-container">
						<div className="study-user-host-item-row-container">
							<div className="study-user-host-item-username">{user.userName}</div>
							<div className="study-user-host-item-host">모집장</div>
						</div>
						<div className="study-user-host-item-intro">{user.bio}</div>
					</div>
				</>
			) : (
				<div />
			)}
		</div>
	);
};

export default StudyUserHostItemPresenter;
