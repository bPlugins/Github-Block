import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from "axios";

import './style.scss';
import Style from './Style';
import Repositories from './Repositories';
import icons from './Const/icons';

// Github Block
document.addEventListener('DOMContentLoaded', () => {
	const allBlockDirectory = document.querySelectorAll('.wp-block-ghb-github');
	allBlockDirectory.forEach(directory => {
		const attributes = JSON.parse(directory.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />
			<RenderRepositories attributes={attributes} />
		</>, directory);

		directory?.removeAttribute('data-attributes');
	});
});

const RenderRepositories = ({ attributes }) => {
	const { userName } = attributes;
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	// Fetch Data 
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`https://api.github.com/users/${userName}/repos?per_page=100`
				);
				setRepos(response.data);
			} catch (error) {
				console.error(error.message);
			}
			setLoading(false);
		}
		fetchData();
	}, []);
	const isBackEnd = false;
	// return loading ? <div className="loader">
	// 	{icons.preloader}
	// </div> : <Repositories attributes={attributes} repos={repos} setRepos={setRepos} loading={loading} setLoading={setLoading} />

	return loading ? <div className="loader ghbUserName">
		{icons.preloader}
	</div> : <>
		{repos.length ?
			<Repositories attributes={attributes} repos={repos} setRepos={setRepos} loading={loading} setLoading={setLoading} />
			: <span></span>}
	</>
}
