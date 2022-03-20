import React, { useMemo, useState } from 'react';
import { IoAdd, IoClose, IoSettings } from 'react-icons/io5';
import useModal from '@src/hooks/modal/useModal';
import ModalKeyEnum from '@common/modal/enum';
import './index.scss';
import { getSubCategoryLabel } from '@src/app/shared/utils/category';
import CommonButton from '@src/components/common/button/CommonButton';
import { ButtonTypeEnum } from '@src/components/common/button/types';
import { Box, Button, ButtonBase, Container, InputAdornment, TextField } from '@material-ui/core';
import usePatchUserProfile from '@src/hooks/remotes/user/usePatchUserProfile';
import classNames from 'classnames';

export interface UrlInterface {
	urlId: number;
	url: string;
}

interface MyProfileEditPresenterProps {
	imgSrc: string;
	nickname: string;
	major: string;
	grade: number;
	onBreak: boolean;
	categories: string[];
	shortIntro: string;
	urls: UrlInterface[];
	longIntro: string;
}

const exampleId = '0357501b-8887-42e1-9dde-8344e0de60b0';

const MyProfileEditPresenter = ({
	imgSrc,
	nickname,
	major,
	grade,
	onBreak,
	categories,
	shortIntro,
	urls,
	longIntro,
}: MyProfileEditPresenterProps): JSX.Element => {
	const updateProfile = usePatchUserProfile();

	const [accUrlId, setAccUrlId] = useState<number>(urls.length);
	const [currentNickname, setCurrentNickname] = useState<string>(nickname);
	const [currentMajor, setCurrentMajor] = useState<string>(major);
	const [currentGrade, setCurrentGrade] = useState<number>(grade);
	const [currentOnBreak, setCurrentOnBreak] = useState<boolean>(onBreak);
	const [currentShortIntro, setCurrentShortIntro] = useState<string>(shortIntro ?? '');
	const [currentUrls, setCurrentUrls] = useState<UrlInterface[]>(urls ?? []);
	const [currentLongIntro, setCurrentLongIntro] = useState<string>(longIntro);

	const { openModal } = useModal();

	const handleUpdateProfile = () => {
		const filteredArray = new Array(2).fill('').map((item, index) => {
			return currentUrls?.[index]?.url ?? '';
		});

		updateProfile.mutate({
			userId: exampleId,
			userName: currentNickname,
			dept: currentMajor,
			grade: String(currentGrade),
			onBreak: currentOnBreak,
			bio: currentShortIntro,
			links: filteredArray,
			userAbout: currentLongIntro,
		});
	};

	const changeProfileImg = () => {
		console.log('changeProfileImg');
	};
	const changeCategories = () => {
		openModal(ModalKeyEnum.EditCategoryModal);
	};
	const addUrl = () => {
		if (currentUrls?.length >= 3) return;
		setCurrentUrls([
			...currentUrls,
			{
				urlId: accUrlId,
				url: '',
			},
		]);
		setAccUrlId(accUrlId + 1);
	};
	const deleteUrl = (paramId: number) => {
		if (currentUrls?.length === 0) return;
		const resultUrls = [...currentUrls].filter((item) => item.urlId !== paramId);
		setCurrentUrls(resultUrls);
	};

	const renderUrls = (item: UrlInterface) => {
		if (item?.url === null) return null;
		return (
			<TextField
				key={item.urlId}
				className={classNames('profile-edit-url-input', 'mb0_5rem')}
				placeholder="자신을 잘 나타낼수록 스터디 구하기가 쉬워져요!"
				value={item.url}
				variant="outlined"
				margin="dense"
				onChange={(e) => {
					const text = e.target.value;
					const result = [...currentUrls].map((selectedItem) => {
						if (item.urlId === selectedItem.urlId) {
							return {
								urlId: item.urlId,
								url: text,
							};
						}
						return selectedItem;
					});
					setCurrentUrls(result);
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<button type="button">
								<IoClose className="profile-edit-icon" color="#929699" onClick={() => deleteUrl(item.urlId)} />
							</button>
						</InputAdornment>
					),
				}}
			/>
		);
	};

	const categoriesText = useMemo(() => {
		const resultCategories = categories.length > 2 ? categories.slice(0, 2) : categories;
		const filiteredCategoryList = resultCategories?.map((item) => getSubCategoryLabel(Number(item)));
		return categories.length > 2
			? `${filiteredCategoryList.join(',')} 외 ${categories.length - 2}개`
			: filiteredCategoryList.join(',');
	}, [categories]);

	return (
		<Box className="profile-edit-container" component="form">
			<Box className="profile-edit-image-container">
				<img className="profile-edit-image-img" src={imgSrc} alt="profile" />
				<ButtonBase className="profile-edit-image-icon-container" onClick={changeProfileImg}>
					<IoSettings className="profile-edit-image-icon-size" color="#ffffff" />
				</ButtonBase>
			</Box>
			<TextField
				className="profile-edit-nickname-input"
				variant="outlined"
				placeholder="닉네임을 입력해 주세요."
				label="닉네임"
				value={currentNickname}
				onChange={(e) => setCurrentNickname(e.target.value)}
				margin="dense"
			/>
			<Box className={classNames('profile-edit-row-container', 'mt40')}>
				<Box className="profile-edit-title">🙋‍♂️ 저는요..</Box>
				<Box className="profile-edit-required-text">(필수정보)</Box>
			</Box>
			<TextField
				className="profile-edit-major-input"
				placeholder="ex. 사회과학대학"
				variant="outlined"
				margin="dense"
				label="단과대"
				value={currentMajor}
				onChange={(e) => setCurrentMajor(e.target.value)}
			/>
			<Box className="profile-edit-row-container mt8">
				<TextField
					className="profile-edit-grade-select"
					select
					value={currentGrade}
					onChange={(e) => setCurrentGrade(Number(e.target.value))}
					margin="dense"
					variant="outlined"
					label="학년"
					SelectProps={{
						native: true,
					}}
				>
					<option value={1}>1학년</option>
					<option value={2}>2학년</option>
					<option value={3}>3학년</option>
					<option value={4}>4학년</option>
				</TextField>
				<TextField
					className="profile-edit-status-select"
					select
					value={Number(currentOnBreak)}
					onChange={(e) => setCurrentOnBreak(Boolean(e.target.value))}
					margin="dense"
					variant="outlined"
					label="재학상태"
					SelectProps={{
						native: true,
					}}
				>
					<option value={0}>재학중</option>
					<option value={1}>휴학중</option>
				</TextField>
			</Box>
			<Box className="divider" />
			<Box className="profile-edit-title">📚 이런 스터디에 관심있어요!</Box>
			<TextField
				disabled
				className="profile-edit-category-input"
				value={categoriesText}
				margin="dense"
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<button type="button">
								<IoSettings className="profile-edit-icon" color="#adb1ba" onClick={changeCategories} />
							</button>
						</InputAdornment>
					),
				}}
			/>
			<Box className="profile-edit-title mt40">
				👋 한줄소개<span className="profile-edit-short-intro-subtitle">({currentShortIntro?.length}/60)</span>
			</Box>
			<TextField
				className="profile-edit-short-intro-input"
				placeholder="프로필 상단에 보이는 소개글입니다."
				margin="dense"
				variant="outlined"
				multiline
				inputProps={{ maxLength: 60 }}
				onChange={(e) => setCurrentShortIntro(e.target.value)}
				value={currentShortIntro}
			/>
			<Box className="profile-edit-title mt2rem">😎 URL 추가</Box>
			{currentUrls.map(renderUrls)}
			<ButtonBase onClick={addUrl} className="profile-edit-url-add-icon">
				<IoAdd className="profile-edit-icon" color="#101010" />
			</ButtonBase>
			<Box className="profile-edit-short-intro-title mt2rem">
				📚 자기소개글
				<span className="profile-edit-short-intro-subtitle"> ({currentLongIntro.length}/500)</span>
			</Box>
			<TextField
				className="profile-edit-long-intro-textarea"
				placeholder="프로필 문구가 너무 짧으신가요? 자기소개글을 완성시켜주세요!"
				margin="dense"
				variant="outlined"
				multiline
				inputProps={{ maxLength: 500 }}
				value={currentLongIntro}
				onChange={(e) => setCurrentLongIntro(e.target.value)}
			/>
			<Container className="profile-edit-edit-button">
				<CommonButton
					type={ButtonTypeEnum.primary}
					title="수정완료"
					onClick={handleUpdateProfile}
					className="profile-edit-edit-button-shadow"
				/>
			</Container>
		</Box>
	);
};

export default MyProfileEditPresenter;
