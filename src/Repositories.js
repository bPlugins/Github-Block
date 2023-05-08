

import { useEffect, useRef, useState } from 'react';
import Pagination from './Components/Pagination';

import Modal from './Components/Modal';
import Logo from './Components/Logo';
import RepoName from './Components/RepoName';
import Description from './Components/Description';
import Download from './Components/Download';
import Topic from './Components/Topic';
import MiniMasonry from "minimasonry";
import { getNumber } from './Const/functions';

const Repositories = ({ attributes, repos, clientId }) => {
	const { columnGap, rowGap, elements, query, columns, githubIcon } = attributes;
	const { logo, repoName, desc, download, topic, pagination, masonry } = elements;
	const [isFullPage, setIsFullPage] = useState(false);
	const [miniMasonry, setMiniMasonry] = useState(null);
	const containerRef = useRef();

	// Handle full page 
	const handleFullPage = () => {
		setIsFullPage(true);
	}
	let toggleClass = isFullPage ? 'activeFull' : null;

	// Pagination 
	const { postsPerPage } = query;
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPosts, setCurrentPosts] = useState([]);

	useEffect(() => {
		const lastPostsIndex = currentPage * postsPerPage;
		const firstPostsIndex = lastPostsIndex - postsPerPage;
		const currentPosts = repos?.slice(firstPostsIndex, lastPostsIndex);
		setCurrentPosts(currentPosts);

	}, [currentPage, repos, postsPerPage]);

	// Masonry Init
	useEffect(() => {
		if (containerRef.current?.classList.contains('masonry') && masonry) {
			var masonayrObj = new MiniMasonry({
				container: containerRef.current,
				gutterX: getNumber(columnGap),
				gutterY: getNumber(rowGap),
				minify: false,
				ultimateGutter: 5,
				surroundingGutter: true
			});
			setMiniMasonry(masonayrObj);

		} else {
			miniMasonry?.destroy();
		}
	}, [currentPosts, masonry, columnGap, rowGap]);

	return <div className='ghbSectionArea'>
		<><div ref={containerRef} className={`ghbMainArea ${masonry && 'masonry'} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile} `}>
			{currentPosts?.map((repositorie, index) => {
				const { name, description, html_url, topics, default_branch } = repositorie;

				return <div key={index} className="ghbSingleRepo">
					<div className='ghbSingleRepoCard'>
						<Logo logo={logo} githubIcon={githubIcon} />
						<RepoName repoName={repoName} name={name} html_url={html_url} />
						<Description description={description} desc={desc} />
						<div className="footer">
							<Download download={download} html_url={html_url} default_branch={default_branch} />
							<Topic topic={topic} topics={topics} />
						</div>
					</div>
				</div>;
			})}
		</div>

			{pagination && <>
				<Pagination totalPosts={repos.length} postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
			</>}

			<Modal currentPosts={currentPosts} clientId={clientId} attributes={attributes} pagination={pagination} setIsFullPage={setIsFullPage} handleFullPage={handleFullPage} toggleClass={toggleClass} repos={repos} logo={logo} repoName={repoName} desc={desc} download={download} topic={topic} masonry={masonry} />
		</>
	</div>
}
export default Repositories;