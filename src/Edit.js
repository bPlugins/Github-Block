import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';

import Settings from './Settings';
import Style from './Style';
import Repositories from './Repositories';
import { tabController } from './Const/functions';
import icons from './Const/icons';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { userName } = attributes;

	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	useEffect(() => {
		if (userName) {
			setLoading(true);
		}
	}, [])

	return <>
		<Settings repos={repos} setRepos={setRepos} attributes={attributes} setAttributes={setAttributes} clientId={clientId} loading={loading} setLoading={setLoading} />

		<div className={className} id={`ghbMainArea-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			{/* {(!userName.trim() || !repos.length) ?
				<div className='ghbUserName'>
					<h1>{__('Please Insert Your Github Username', 'github')}</h1>
				</div>
				: <Repositories clientId={clientId} attributes={attributes} repos={repos} setRepos={setRepos} loading={loading} setLoading={setLoading} />} */}

			{loading ? <div className="loader">
				{icons.preloader}
			</div> : <>
				{repos.length ?
					<Repositories clientId={clientId} attributes={attributes} repos={repos} setRepos={setRepos} loading={loading} setLoading={setLoading} />
					: <div className='ghbUserName'>
						<h1>{__('Please Insert Your Github Username And Fetch Data', 'github')}</h1>
					</div>}
			</>}


		</div>
	</>;
};
export default Edit;