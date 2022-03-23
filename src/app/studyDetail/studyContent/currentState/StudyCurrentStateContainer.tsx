import React, { useEffect, useState } from 'react';
import useFetchStudyUsers from '@src/hooks/remotes/studyUser/useFetchStudyUsers';
import Loader from '@src/components/common/loader/Loader';
import useFetchUserProfile from '@src/hooks/remotes/user/useFetchUserProfile';
import StudyCurrentStatePresenter from './StudyCurrentStatePresenter';

interface StudyCurrentStateContainerProps {
	studyId: string;
	hostId: string;
	capacity: number;
	isHost: boolean;
}

const StudyCurrentStateContainer = ({
	studyId,
	hostId,
	capacity,
	isHost,
}: StudyCurrentStateContainerProps): JSX.Element => {
	const { data, isLoading } = useFetchStudyUsers(studyId);
	const { data: hostData, isLoading: isHostLoading } = useFetchUserProfile(hostId);

	if (isLoading || isHostLoading) return <Loader />;

	// TODO: 수락 대기중 api 추가
	return data && hostData ? (
		<StudyCurrentStatePresenter host={hostData.userProfile} studyUsers={data} capacity={capacity} isHost={isHost} />
	) : (
		<div />
	);
};

export default StudyCurrentStateContainer;
