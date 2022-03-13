import { Box, Button, List, ListItem, ListItemText, SwipeableDrawer, Typography } from '@material-ui/core';
import usePatchLogout from '@src/hooks/remotes/user/usePatchLogout';
import globalState from '@src/state';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import React, { useCallback, useState } from 'react';
import { IoMenu, IoNotifications, IoSearch } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { drawerList, drawerListBeforeLogin } from './drawerList';
import './index.scss';

const Header: React.FC = () => {
	const history = useHistory();

	const [state] = useAtom(globalState);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const logout = usePatchLogout();

	const handleLogout = () => {
		logout.mutate();
	};

	const openDrawer = () => {
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
	};

	const clickSearchIcon = () => {
		console.log('clickSearchIcon');
	};

	const clickNotification = () => {
		console.log('clickNotification');
	};

	const renderDrawerList = useCallback(() => {
		const list = state.login ? drawerList : drawerListBeforeLogin;

		return list.map((drawerSubList, drawerSubListIdx, { length: drawerSubListLength }) => {
			return drawerSubList.map((drawerItem, drawerItemIdx, { length: drawerItemLength }) => (
				<ListItem
					button
					key={drawerItem.title}
					disableGutters
					component="a"
					href={drawerItem.route}
					divider={drawerItemIdx === drawerItemLength - 1 && drawerSubListIdx !== drawerSubListLength - 1}
				>
					<ListItemText
						className={classNames('drawer-item-button', { 'font-bold': drawerItem?.isBold })}
						disableTypography
					>
						{drawerItem.title}
					</ListItemText>
				</ListItem>
			));
		});
	}, [drawerList, drawerListBeforeLogin, state.login]);

	return (
		<header className="header-con">
			<IoMenu className="header-icon" type="button" onClick={openDrawer} />
			<Typography className="header-logo">서비스 로고</Typography>
			{state.login ? (
				<div>
					<IoSearch className="header-icon" type="button" onClick={clickSearchIcon} />
					<IoNotifications className="header-icon" type="button" onClick={clickNotification} />
				</div>
			) : (
				<Button onClick={() => history.push('/login')}>
					<Typography className="header-login">로그인</Typography>
				</Button>
			)}
			<SwipeableDrawer
				anchor="left"
				open={isDrawerOpen}
				onOpen={openDrawer}
				onClose={closeDrawer}
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
			>
				<div className="drawer-container">
					<div>이미지 들어갈 영역</div>
					<List disablePadding component="nav">
						{renderDrawerList()}
					</List>
				</div>
				{state.login && (
					<Button fullWidth onClick={handleLogout}>
						<Box className="drawer-logout-text">로그아웃</Box>
					</Button>
				)}
			</SwipeableDrawer>
		</header>
	);
};

export default Header;
