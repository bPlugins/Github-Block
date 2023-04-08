
import { useEffect, useRef, useState } from 'react';
import icons from '../Const/icons';
import Description from './Description';
import Download from './Download';
import Logo from './Logo';
import RepoName from './RepoName';
import Topic from './Topic';
import MiniMasonry from "minimasonry";
import { getNumber } from '../Const/functions';

const Modal = ({ currentPosts, attributes, pagination, setIsFullPage, handleFullPage, toggleClass, repos, logo, repoName, desc, download, topic, masonry }) => {
    const { columns, githubIcon, columnGap, rowGap } = attributes;
    const [miniMasonry, setMiniMasonry] = useState(null);
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current?.classList.contains('masonry') && masonry) {

            var masonayrObj = new MiniMasonry({
                container: containerRef.current,
                gutterX: getNumber(columnGap),
                gutterY: getNumber(rowGap),
                minify: false,
                ultimateGutter: 5,
                surroundingGutter: true,
            });
            setMiniMasonry(masonayrObj);

        } else {
            miniMasonry?.destroy();
        }
    }, [currentPosts, masonry, columnGap, rowGap]);

    return <>{!pagination && <>
        <div className="modalSection" onClick={(e) => {
            if (e.target.classList.contains('ghbModalMainSection')) {
                setIsFullPage(false);
            }
        }}>
            <button className="button button--nina button--text-thick button--text-upper button--size-s" data-text="View All Gits" onClick={handleFullPage} ><span>V</span><span>i</span><span>e</span><span>w</span> <span></span><span>A</span><span>l</span><span>l</span><span></span> <span>G</span><span>i</span><span>t</span><span>s</span></button>

            <div className={`ghbModalMainSection ghbModalPopup ${toggleClass}`}>
                <div className="ghbChildSection">
                    <div className="ghbCloseBtn" onClick={() => setIsFullPage(false)}>
                        {icons.closeBtn}
                    </div>
                    <div ref={containerRef} className={`ghbMainArea ${masonry && 'masonry'} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
                        {repos?.map((repositorie, index) => {
                            const { name, description, html_url, topics, default_branch } = repositorie;

                            return <div key={index} className="ghbSingleRepo">
                                <div className='ghbSingleRepoCard'>
                                    <Logo logo={logo} githubIcon={githubIcon} />
                                    <RepoName repoName={repoName} name={name} html_url={html_url} />
                                    <Description desc={desc} description={description} />

                                    <div className="footer">
                                        <Download download={download} html_url={html_url} default_branch={default_branch} />
                                        <Topic topic={topic} topics={topics} />
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>}</>

}
export default Modal;