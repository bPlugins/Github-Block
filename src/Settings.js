import { __ } from '@wordpress/i18n';
import produce from 'immer';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, ToggleControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl, Button, __experimentalInputControl as InputControl } from '@wordpress/components';

// Settings Components
import Title from '../../Components/Title';
import BDevice from '../../Components/BDevice';
import Background from '../../Components/Background';
import Typography from '../../Components/Typography';
import BColor from '../../Components/BColor';
import ColorsControl from '../../Components/ColorsControl';
import BorderControl from '../../Components/BorderControl';


import { tabController } from './Const/functions';
import icons from './Const/icons';
import options from './Const/options';
import { useState, useEffect } from '@wordpress/element';

const { generalStyleTabs, pxUnit, perUnit, emUnit } = options;

const Settings = ({ attributes, setAttributes, setRepos, setLoading, handleFetchData }) => {
	const { columns, columnGap, rowGap, userName, isInfo, paginationAttr, wrapperBgColor, wrapperPadding, cardBackground, cardPadding, cardBorder, githubIcon, nameTypo, nameColor, descTypo, descColor, downloadBtnTypo, downloadBtnColor, downloadBtnPadding, downloadBtnBorder, paginationBtnTypo, paginationBtnColor, paginationBtnActiveColor, paginationBtnBorder, modalBtnTypo, modalBtnColors, modalBtnHoverColors, modalBtnBorder, modalBtnHoverBorder, modalBtnPadding } = attributes;

	const { logo, repoName, desc, download, topic, pagination, masonry } = isInfo;
	const { postsPerPage } = paginationAttr;
	const [device, setDevice] = useState('desktop');

	// Object attr update
	const updateObject = (attr, key, val) => {
		const newAttr = { ...attributes[attr] };
		newAttr[key] = val;
		setAttributes({ [attr]: newAttr })
	}

	useEffect(() => {
		icons.github2(githubIcon.size);
		icons.github2(githubIcon.color);
	}, [githubIcon]);

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel ghbTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={() => tabController()}>{tab => <>
				{'general' === tab.name && <>

					{/* <PanelBody className='bPlPanelBody help' title={__('Help', 'github')} initialOpen={false}>
						<div className='helpItem'>
							<a href='https://bblockswp.com/block-directory/' target='_blank' rel='noreferrer'><Dashicon icon='book' />{__('Read Documentation', 'block-directory')}</a>
						</div>

						<div className='helpItem rateUs'>
							<a href='https://wordpress.org/support/plugin/block-directory/reviews/#new-post' target='_blank' rel='noreferrer'>
								<span><Dashicon icon='star-filled' />{__('Would you please rate us?', 'block-directory')}</span>
								<span>{__('We are new and we need your help to grow!🙏', 'block-directory')}</span>
							</a>
						</div>
					</PanelBody> */}

					<PanelBody className='bPlPanelBody' title={__('Github Username', 'github')} initialOpen={false}>
						<PanelRow className='gap10'>
							<InputControl className="ghbInput" label="" value={userName} onChange={val => {
								setAttributes({ userName: val }),
									setRepos([]);
							}} />

							<Button className='ghbBtn' variant='scondary' onClick={handleFetchData} disabled={!userName.trim()}>{__('Fetch Data', 'github')}</Button>
						</PanelRow>

					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('Repositories Info', 'github')} initialOpen={false}>

						<ToggleControl label={__('Logo', 'github')} className='mt20' checked={logo} onChange={(val) => { setAttributes({ isInfo: { ...isInfo, logo: val } }); }} />

						<ToggleControl label={__('Name', 'github')} className='mt20' checked={repoName} onChange={(val) => { setAttributes({ isInfo: { ...isInfo, repoName: val } }); }} />

						<ToggleControl label={__('Description', 'github')} className='mt20' checked={desc} onChange={(val) => { setAttributes({ isInfo: { ...isInfo, desc: val } }); }} />

						<ToggleControl label={__('Download Button', 'github')} className='mt20' checked={download} onChange={(val) => { setAttributes({ isInfo: { ...isInfo, download: val } }); }} />

						<ToggleControl label={__('Topic', 'github')} className='mt20' checked={topic} onChange={(val) => { setAttributes({ isInfo: { ...isInfo, topic: val } }); }} />

					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('Pagination', 'github')} initialOpen={false}>

						<ToggleControl label={__('Pagination', 'github')} className='mt20' checked={pagination} onChange={(val) => { updateObject('isInfo', 'pagination', val) }} />

						<Title>{__('Post Per Page', 'github')}</Title>
						<RangeControl className='' value={postsPerPage} onChange={val =>
							updateObject('paginationAttr', 'postsPerPage', val)}
							min={1} max={20} step={1} />

					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('Layout', 'github')} initialOpen={false}>

						<ToggleControl label={__('Masonry', 'github')} className='mt20' checked={masonry} onChange={(val) => { updateObject('isInfo', 'masonry', val) }} />

						{/* column Gap  */}
						<UnitControl className='mt20' label={__('Column Gap:', 'github')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

						{/* row Gap  */}
						<UnitControl className='mt20' label={__('Row Gap:', 'github')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />

						{!masonry && <>
							{/* column define option  */}
							<PanelRow className='mt20'>
								<Title mt='0'>{__('Columns:', 'github')}</Title>
								<BDevice device={device} onChange={val => setDevice(val)} />
							</PanelRow>

							<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />
						</>}

					</PanelBody>

				</>}

				{'style' === tab.name && <>

					<PanelBody className='bPlPanelBody' title={__('Wrapper', 'github')} initialOpen={false}>
						<Background className='mb20' label={__('Background:', 'github')} value={wrapperBgColor} onChange={val => setAttributes({ wrapperBgColor: val })} />

						<BoxControl label={__('Padding', 'github')} values={wrapperPadding} onChange={val => setAttributes({ wrapperPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />
					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('Card', 'github')} initialOpen={false}>
						<Background className='mb20' label={__('Background:', 'github')} value={cardBackground} onChange={val => setAttributes({ cardBackground: val })} />

						<BoxControl className='mb20' label={__('Padding', 'github')} values={cardPadding} onChange={val => setAttributes({ cardPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />

						<BorderControl className='mt20' label={__('Border', 'github')} value={cardBorder} onChange={(val) => setAttributes({ cardBorder: val })} />
					</PanelBody>

					{logo && <>
						<PanelBody className='bPlPanelBody' title={__('Icon', 'github')} initialOpen={false}>

							<Title className='mt10'>{__('Size', 'github')}</Title>
							<RangeControl value={githubIcon.size} onChange={(value) => {
								updateObject('githubIcon', 'size', value)
							}} min={1} max={100} />

							<BColor className='mt20' label={__('Color', 'github')} value={githubIcon.color}
								onChange={val => setAttributes({ githubIcon: { ...githubIcon, color: val } })} defaultColor='#fff' />
						</PanelBody>
					</>}

					{repoName && <>
						<PanelBody className='bPlPanelBody' title={__('Name', 'github')} initialOpen={false}>
							<Typography className='mt10' label={__('Typography', 'github')} value={nameTypo} onChange={val => setAttributes({ nameTypo: val })} produce={produce} />

							<BColor label={__('Color', 'github')} value={nameColor}
								onChange={val => setAttributes({ nameColor: val })} />
						</PanelBody>
					</>}

					{desc && <>
						<PanelBody className='bPlPanelBody' title={__('Description', 'github')} initialOpen={false}>
							<Typography className='mt10' label={__('Typography', 'github')} value={descTypo} onChange={val => setAttributes({ descTypo: val })} produce={produce} />

							<BColor label={__('Color', 'github')} value={descColor}
								onChange={val => setAttributes({ descColor: val })} />
						</PanelBody>
					</>}

					{(download && topic) && <>
						<PanelBody className='bPlPanelBody' title={__('Download Button & Topic', 'github')} initialOpen={false}>

							<Typography className='mt10' label={__('Typography', 'github')} value={downloadBtnTypo} onChange={val => setAttributes({ downloadBtnTypo: val })} produce={produce} />

							<ColorsControl className='mb20' label={__('Colors', 'github')} value={downloadBtnColor} onChange={val => setAttributes({ downloadBtnColor: val })} />

							<BoxControl label={__('Padding', 'github')} values={downloadBtnPadding} onChange={val => setAttributes({ downloadBtnPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />

							<BorderControl className='mt10' label={__('Border', 'github')} value={downloadBtnBorder} onChange={(val) => setAttributes({ downloadBtnBorder: val })} />
						</PanelBody>
					</>}

					{pagination && <>
						<PanelBody className='bPlPanelBody' title={__('Pagination', 'github')} initialOpen={false}>
							<Typography className='mt10' label={__('Typography', 'github')} value={paginationBtnTypo} onChange={val => setAttributes({ paginationBtnTypo: val })} produce={produce} />

							<ColorsControl className='' label={__('Colors', 'github')} value={paginationBtnColor} onChange={val => setAttributes({ paginationBtnColor: val })} />

							<ColorsControl className='' label={__('Active Colors', 'github')} value={paginationBtnActiveColor} onChange={val => setAttributes({ paginationBtnActiveColor: val })} />

							<BorderControl className='mt10' label={__('Border', 'github')} value={paginationBtnBorder} onChange={(val) => setAttributes({ paginationBtnBorder: val })} />
						</PanelBody>
					</>}

					{!pagination && <>
						<PanelBody className='bPlPanelBody' title={__('Modal Button', 'github')} initialOpen={false}>
							<Typography className='mt20' label={__('Typography', 'github')} value={modalBtnTypo} onChange={val => setAttributes({ modalBtnTypo: val })} produce={produce} />

							<ColorsControl className='' label={__('Colors', 'github')} value={modalBtnColors} onChange={val => setAttributes({ modalBtnColors: val })} />

							<ColorsControl className='' label={__('Hover Colors', 'github')} value={modalBtnHoverColors} onChange={val => setAttributes({ modalBtnHoverColors: val })} />

							<BorderControl className='mt10' label={__('Border', 'github')} value={modalBtnBorder} onChange={(val) => setAttributes({ modalBtnBorder: val })} />

							<BorderControl className='mt10 mb20' label={__('Hover Border', 'github')} value={modalBtnHoverBorder} onChange={(val) => setAttributes({ modalBtnHoverBorder: val })} />

							<BoxControl label={__('Padding', 'github')} values={modalBtnPadding} onChange={val => setAttributes({ modalBtnPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />
						</PanelBody>
					</>}

				</>}
			</>}</TabPanel>
		</InspectorControls>
	</>;
};
export default Settings;