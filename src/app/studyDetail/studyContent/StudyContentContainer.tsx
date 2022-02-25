/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import StudyAskContainer from './ask/StudyAskContainer';
import StudyCurrentStateContainer from './currentState/StudyCurrentStateContainer';
import StudyInfoContentContainer from './info/StudyInfoContentContainer';
import './styles.scss';

interface StudyContentContainerProps {
	studyId: string | undefined;
	hostId: string | undefined;
	createdAt: Date | string | undefined;
	views: number | undefined;
	bookmarks: number | undefined;
	title: string | undefined;
	studyAbout: string | undefined;
}

const StudyContentContainer = ({
	studyId,
	hostId,
	createdAt,
	views,
	bookmarks,
	title,
	studyAbout,
}: StudyContentContainerProps): JSX.Element => {
	const [index, setIndex] = useState<number>(1);
	const [loading, setLoadingState] = useState<boolean>(true);

	const content = (i: number): JSX.Element => {
		if (i === 1)
			return (
				<StudyInfoContentContainer
					createdAt={createdAt}
					views={views}
					bookmarks={bookmarks}
					title={title}
					studyAbout={studyAbout}
				/>
			);
		if (i === 2) return <StudyCurrentStateContainer studyId={studyId} hostId={hostId} />;
		if (i === 3) return <StudyAskContainer />;

		return <div />;
	};

	useEffect(() => {
		if (studyId === undefined) {
			setLoadingState(false);
		}
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="studyContentContainer">
			<div className="studyContentButtons">
				<button className={index === 1 ? 'clicked' : 'infoButton'} type="button" onClick={() => setIndex(1)}>
					<span>스터디 정보</span>
				</button>
				<button className={index === 2 ? 'clicked' : 'currentStateButton'} type="button" onClick={() => setIndex(2)}>
					<span>참가 현황</span>
				</button>
				<button className={index === 3 ? 'clicked' : 'askButton'} type="button" onClick={() => setIndex(3)}>
					<span>문의글</span>
				</button>
			</div>

			{content(index)}
		</div>
	);
};

export default StudyContentContainer;
